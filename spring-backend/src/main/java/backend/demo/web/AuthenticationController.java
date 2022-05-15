package backend.demo.web;

import backend.demo.model.dto.UserDto;
import backend.demo.model.jwt.JwtRequest;
import backend.demo.model.jwt.JwtResponse;
import backend.demo.security.ProfileUserDetailsService;
import backend.demo.service.UserService;
import backend.demo.utility.JWTUtility;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
@Slf4j
public class AuthenticationController {
    private final UserService userService;
    private final JWTUtility jwtUtility;
    private final AuthenticationManager authenticationManager;
    private final ProfileUserDetailsService profileUserDetailsService;

    @PostMapping("/signup")
    @Operation(summary = "Create new client-user")
    public ResponseEntity<?> signup(@RequestBody UserDto user) {
        if (userService.userExists(user.getUsername(), user.getEmail())) {
            throw new RuntimeException("Username or email address already in use.");
        }
        UserDto userDto = userService.register(user);
        log.info("Successfully created user with username {}", userDto.getUsername());
        return new ResponseEntity<>(userDto, HttpStatus.CREATED);
    }

    @PostMapping("/authenticate")
    @Operation(summary = "Authenticate user and get JWT Token")
    public JwtResponse authenticate(@RequestBody JwtRequest jwtRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            jwtRequest.getUsername(),
                            jwtRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }

        UserDetails userDetails = profileUserDetailsService.loadUserByUsername(jwtRequest.getUsername());
        String token = jwtUtility.generateToken(userDetails);

        return new JwtResponse(token);
    }

    @PostMapping("/login")
    @Operation(summary = "Login based on user role after authentication", security = @SecurityRequirement(name = "bearerAuth"))
    public String logInUser(@RequestParam String username) {
        UserDto userByUsername = userService.findUserByUsername(username);
        return userByUsername.getRole();
    }
}


