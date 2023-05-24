package br.com.teste.service;

import br.com.teste.model.entity.Usuario;
import br.com.teste.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository repository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario usuario = repository.findByUsername(username);

		if (usuario.getId() != null) {
			String senha = bCryptPasswordEncoder.encode(usuario.getPassword());
			return new User(usuario.getUsername(), senha,	new ArrayList<>());
		} else {
			throw new UsernameNotFoundException("Usuário não encontrado: " + username);
		}
	}

}