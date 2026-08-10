% Tarea 3 - Sistema Centro de Apoyo Academico
% Ricardo Rico, Isaac Acevedo, Francisca Duijvesteijn
% NRC: 8002

% -----------------------------------------------
% DATOS
% -----------------------------------------------

estudiante(ana, programacion, 6.5).
estudiante(luis, programacion, 3.2).
estudiante(maria, prolog, 5.0).
estudiante(carlos, prolog, 2.8).
estudiante(sofia, matematicas, 6.0).
estudiante(pedro, matematicas, 3.9).
estudiante(valentina, programacion, 5.5).
estudiante(diego, prolog, 4.0).
estudiante(camila, matematicas, 6.8).
estudiante(javier, programacion, 2.5).
estudiante(isidora, prolog, 5.8).
estudiante(tomas, matematicas, 3.1).
estudiante(paula, programacion, 4.3).
estudiante(matias, prolog, 6.2).
estudiante(barbara, matematicas, 2.0).
estudiante(nicolas, programacion, 5.1).
estudiante(javiera, prolog, 3.7).
estudiante(sebastian, matematicas, 6.5).
estudiante(daniela, programacion, 4.8).
estudiante(alejandro, prolog, 2.2).
estudiante(constanza, matematicas, 5.4).
estudiante(rodrigo, programacion, 3.5).
estudiante(fernanda, prolog, 6.1).
estudiante(andres, matematicas, 4.1).
estudiante(antonella, programacion, 5.9).
estudiante(bastian, prolog, 3.0).
estudiante(catalina, matematicas, 6.7).
estudiante(ignacio, programacion, 2.9).
estudiante(pilar, prolog, 5.2).
estudiante(gabriel, matematicas, 4.6).

% ---------------------------------------------------
% REGLAS Y CONSULTAS
% ---------------------------------------------------

pertenece(Estudiante, Curso) :-
    estudiante(Estudiante, Curso, _).

aprobado(Estudiante) :-
    estudiante(Estudiante, _, Nota),
    Nota >= 4.

reprobado(Estudiante) :-
    estudiante(Estudiante, _, Nota),
    Nota < 4.

mostrar_estado_estudiante :-
    nl,
    write('=== Consulta de Estudiante ==='), nl,
    write('Ingrese el nombre del estudiante: '),
    read(Nombre),
    (   estudiante(Nombre, Curso, Nota)
    ->  write('Estudiante: '), write(Nombre), nl,
        write('Curso: '), write(Curso), nl,
        write('Nota: '), write(Nota), nl,
        (   Nota >= 4
        ->  write('Estado: Aprobado'), nl
        ;   write('Estado: Reprobado'), nl
        )
    ;   write('Estudiante no encontrado.'), nl
    ).

calcular(N1, suma, N2, R) :- R is N1 + N2.
calcular(N1, resta, N2, R) :- R is N1 - N2.
calcular(N1, mult, N2, R) :- R is N1 * N2.
calcular(N1, div, N2, R) :-
    (   N2 =:= 0
    ->  write('Error: division por cero.'), nl, fail
    ;   R is N1 / N2
    ).

calculadora :-
    nl,
    write('=== Calculadora ==='), nl,
    write('Primer numero: '), read(N1),
    write('Segundo numero: '), read(N2),
    write('Operacion (suma / resta / mult / div): '), read(Op),
    (   calcular(N1, Op, N2, R)
    ->  write('Resultado: '), write(R), nl
    ;   write('Operacion no reconocida o error en el calculo.'), nl
    ).

%------------------------------------------------------------------------------
% MENU
%------------------------------------------------------------------------------

menu :-
    repeat,
        nl,
        write('=== Centro de Apoyo Academico ==='), nl,
        write('1. Consultar estado de un estudiante'), nl,
        write('2. Calculadora'), nl,
... (11 líneas restantes)