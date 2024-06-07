package com.curso.curso.controllers;

import com.curso.curso.dao.UsuarioDao;
import com.curso.curso.models.Usuario;
import com.curso.curso.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDao usuarioDao;

    @RequestMapping(value = "api/usuarios/editar/{id}", method = RequestMethod.GET)
    public Usuario getUsuario(@RequestHeader(value = "Authorization") String token,
                              @PathVariable Integer id) {

        if (!validarToken(token)) {
            return null;
        }

        return usuarioDao.getUsuario(id);
    }

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/usuarios", method = RequestMethod.GET)
    public List<Usuario> getUsuarios(@RequestHeader(value = "Authorization") String token) {

        if (!validarToken(token)) {
            return null;
        }

        return usuarioDao.getUsuarios();
    }

    @RequestMapping(value = "api/usuarios", method = RequestMethod.POST)
    public void registrarUsuarios(@RequestBody Usuario usuario) {
        // para hashear la pasw
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, usuario.getPassword());
        usuario.setPassword(hash);

        usuarioDao.registrarUsuarios(usuario);
    }

    @RequestMapping(value = "api/usuarios/editar", method = RequestMethod.POST)
    public void guardarEditarUsuario(@RequestBody Usuario usuario) {
        // para hashear la pasw
       /*
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, usuario.getPassword());
        usuario.setPassword(hash);
        */

        usuarioDao.guardarEditarUsuario(usuario);
    }

    private boolean validarToken(String token) {
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }

    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.DELETE)
    public void eliminarUsuario(@RequestHeader(value = "Authorization") String token,
                                @PathVariable Long id) {
        if (!validarToken(token)) {
            return;
        }

        usuarioDao.eliminar(id);
    }


}
