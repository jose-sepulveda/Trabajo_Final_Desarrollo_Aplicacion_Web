package cl.ucm.coffee.web.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {
    @Autowired
    private JwtFilter jwtFilter;

    //@Autowired
    //public SecurityConfig(JwtFilter jwtFilter) {
    //    this.jwtFilter = jwtFilter;
   // }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors().and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeHttpRequests()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.POST,"/api/auth/login").permitAll()
                //Users
                .requestMatchers(HttpMethod.GET,"/api/auth/list").hasAnyRole("ADMIN")
                .requestMatchers(HttpMethod.GET,"/api/auth/{username}").hasAnyRole("ADMIN")
                .requestMatchers(HttpMethod.POST,"/api/newUser").hasAnyRole("CUSTOMER")
                .requestMatchers(HttpMethod.PUT,"/api/auth/{username}").permitAll()
                .requestMatchers(HttpMethod.PATCH,"/api/auth/bloquear/{username}").hasAnyRole("ADMIN")
                .requestMatchers(HttpMethod.PATCH,"/api/auth/disable/{username}").hasAnyRole("ADMIN", "CUSTOMER")
                //Coffee
                .requestMatchers(HttpMethod.GET,"/api/coffee/list").permitAll()
                .requestMatchers(HttpMethod.GET,"/api/coffee/{id}").hasAnyRole("ADMIN", "CUSTOMER")
                .requestMatchers(HttpMethod.POST,"/api/coffee/newCoffee").hasAnyRole("ADMIN")
                .requestMatchers(HttpMethod.PUT,"/api/coffee/{id}").hasAnyRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/coffee/{id}").hasAnyRole("ADMIN")
                .requestMatchers(HttpMethod.GET,"/api/coffee/search/{name}").hasAnyRole("CUSTOMER")
                //Testimonials
                .requestMatchers(HttpMethod.GET,"/api/testimonials/{idCoffee}").permitAll()
                .requestMatchers(HttpMethod.POST,"/api/testimonials/newTestimonials/{idCoffee}/{username}").hasAnyRole("CUSTOMER")
                .anyRequest()
                .authenticated()
                .and()
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);



        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
