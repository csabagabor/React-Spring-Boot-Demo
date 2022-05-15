package backend.articles.security;


import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class ProfileUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return mapToUserDetails(username);
    }

    private UserDetails mapToUserDetails(String username) {
        List<GrantedAuthority> authorities = new java.util.ArrayList<>(List.of(new SimpleGrantedAuthority("ROLE_USER")));

        return new org.springframework.security.core.userdetails.User(username, username, authorities);
    }
}
