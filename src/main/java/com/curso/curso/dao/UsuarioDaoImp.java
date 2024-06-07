package com.curso.curso.dao;

import com.curso.curso.models.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class UsuarioDaoImp implements UsuarioDao{

    @PersistenceContext
    private EntityManager entityManager;
    /*sirve para la conexion a la BD*/

    @Override
    public void eliminar(Long id) {
        Usuario usuario = entityManager.find(Usuario.class,id);
        entityManager.remove(usuario);
    }

    @Override
    public void registrarUsuarios(Usuario usuario) {
        entityManager.merge(usuario);
    }

    @Override
    public void guardarEditarUsuario(Usuario usuario) {
        Usuario usuarioExistente = entityManager.find(Usuario.class, usuario.getId());
        usuario.setPassword(usuarioExistente.getPassword());

        entityManager.merge(usuario);
    }

    @Override
    public List<Usuario> getUsuarios() {

        String query = "FROM Usuario";
        /* Usuario hace referencia al nombre de la clase no de la tabla */
        List<Usuario> resultado = entityManager.createQuery(query).getResultList();
        return resultado;
    }

    @Override
    public Usuario obtenerUsuarioPorCredenciales(Usuario usuario) {

        String query = "FROM Usuario WHERE email = :email AND estado = 1";
        List<Usuario> lista = entityManager.createQuery(query)
                .setParameter("email", usuario.getEmail())
                .getResultList();

        if (lista.isEmpty()){
            return null;
        }

        String passwordHashed = lista.get(0).getPassword();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (argon2.verify(passwordHashed, usuario.getPassword())) {
            return lista.get(0);
        }
        return null;
    }

    @Override
    public Usuario getUsuario(Integer id) {

        String query = "FROM Usuario WHERE id = "+ id;
        List<Usuario> lista = entityManager.createQuery(query)
                .getResultList();

        if (lista.isEmpty()){
            return null;
        }

        return lista.get(0);
    }


}
