package backend.demo.service;

import backend.demo.model.dto.UserDto;
import backend.demo.model.entities.User;
import backend.demo.model.repostiory.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.lang.String.format;

@Service
@Transactional
@AllArgsConstructor
public class UserService {
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDto register(UserDto userDto) {
        User user = modelMapper.map(userDto, User.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return modelMapper.map(userRepository.save(user), UserDto.class);
    }

    public UserDto findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(user -> modelMapper.map(userRepository.save(user), UserDto.class))
                .orElseThrow(() -> new UsernameNotFoundException(format("User with username %s was not found.", username)));
    }

    public boolean userExists(String username, String email) {
        Optional<User> byUsername = userRepository.findByUsername(username);
        Optional<User> byEmail = userRepository.findByEmail(email);
        return byUsername.isPresent() || byEmail.isPresent();
    }

    public List<UserDto> findAll() {
        return userRepository.findAll()
                .stream().map(user -> modelMapper.map(userRepository.save(user), UserDto.class))
                .collect(Collectors.toList());
    }
}
