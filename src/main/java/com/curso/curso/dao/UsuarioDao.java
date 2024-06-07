package com.curso.curso.dao;

import com.curso.curso.models.Usuario;

import java.util.List;

public interface UsuarioDao{

    public List<Usuario> getUsuarios();

    void eliminar(Long id);


    void registrarUsuarios(Usuario usuario);

    Usuario obtenerUsuarioPorCredenciales(Usuario usuario);

    Usuario getUsuario(Integer id);

    void guardarEditarUsuario(Usuario usuario);
}
