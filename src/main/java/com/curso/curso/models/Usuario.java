package com.curso.curso.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuarios")
@ToString @EqualsAndHashCode
@Data
@Getter
@Setter
public class Usuario {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id")
    private Long  id;

    @Getter @Setter @Column(name = "nombre")
    private String nombre;

    @Getter @Setter @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Getter @Setter @Column(name = "atributo")
    private Integer atributo;

    @Getter @Setter @Column(name = "estado")
    private Integer estado;




}
