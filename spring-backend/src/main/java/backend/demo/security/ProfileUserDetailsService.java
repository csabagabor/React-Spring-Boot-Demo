package backend.demo.security;

import backend.demo.model.entities.User;
import backend.demo.model.repostiory.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;

import static java.lang.String.format;

@Component
@AllArgsConstructor
public class ProfileUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userEntity = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException(format("User with username %s was not found.", username)));

        return mapToUserDetails(userEntity);
    }

    private UserDetails mapToUserDetails(User userEntity) {

        List<GrantedAuthority> authorities = new java.util.ArrayList<>(List.of(new SimpleGrantedAuthority("ROLE_USER")));

        if ("ADMIN".equals(userEntity.getRole())) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }

        return new org.springframework.security.core.userdetails.User(
                userEntity.getUsername(),
                userEntity.getPassword(),
                authorities
        );
    }
}
