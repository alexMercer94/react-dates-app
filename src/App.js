import React, { useState, useEffect, Fragment } from 'react';

function Date({ date, index, deleteDate }) {
    return (
        <div className="cita">
            <p>
                Mascota: <span>{date.mascota}</span>
            </p>
            <p>
                Dueño: <span>{date.propietario}</span>
            </p>
            <p>
                Fecha: <span>{date.fecha}</span>
            </p>
            <p>
                Hora: <span>{date.hora}</span>
            </p>
            <p>
                Sintomas: <span>{date.sintomas}</span>
            </p>
            <button onClick={() => deleteDate(index)} type="button" className="button eliminar u-full-width">
                Eliminar X
            </button>
        </div>
    );
}

function Form({ createDate }) {
    const intialState = {
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    };

    // date = state actual
    // updateDate = funcion para cambiar el state
    const [date, updateDate] = useState(intialState);

    /**
     * Add date in he State
     * @param {*} e Event to contains data to save in state
     */
    const updateState = e => {
        updateDate({
            ...date,
            [e.target.name]: e.target.value
        });
    };

    /**
     * Send date to the main's component state
     * @param {*} e Event to prevent refresh form
     */
    const sendDate = e => {
        e.preventDefault();

        // Paasar la cita a el componente principial
        createDate(date);
        // Reiniciar el state
        updateDate(intialState);
    };

    return (
        <Fragment>
            <h2>Crear Cita</h2>

            <form onSubmit={sendDate}>
                <label>Nombre Mascota</label>
                <input
                    onChange={updateState}
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    value={date.mascota}
                />

                <label>Nombre Dueño</label>
                <input
                    onChange={updateState}
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la Mascota"
                    value={date.propietario}
                />

                <label>Fecha</label>
                <input onChange={updateState} type="date" className="u-full-width" name="fecha" value={date.fecha} />

                <label>Hora</label>
                <input onChange={updateState} type="time" className="u-full-width" name="hora" value={date.hora} />

                <label>Sintomas</label>
                <textarea onChange={updateState} className="u-full-width" name="sintomas" value={date.sintomas} />

                <button type="submit" className="button-primary u-full-width">
                    Agregar
                </button>
            </form>
        </Fragment>
    );
}

function App(props) {
    // Cargar las citas del localstorage como state inicial
    let initialDates = JSON.parse(localStorage.getItem('dates'));

    if (!initialDates) {
        initialDates = [];
    }

    // Use state retorna 2 funciones
    // El state  actual = this.state
    // Funcion que actualiza el state =  this.setState({})
    const [dates, saveDate] = useState(initialDates);

    // Agregar las nuevas citas al state
    const createDate = date => {
        // Tomar una copia del state y agregar el nuevo cliente
        const newDates = [...dates, date];
        // Almacenar en el state
        saveDate(newDates);
    };

    // Elimina las citas del State
    const deleteDate = index => {
        const newDates = [...dates];
        newDates.splice(index, 1);
        saveDate(newDates);
    };

    useEffect(() => {
        const initialDates = JSON.parse(localStorage.getItem('dates'));

        if (initialDates) {
            localStorage.setItem('dates', JSON.stringify(dates));
        } else {
            localStorage.setItem('dates', JSON.stringify([]));
        }
    }, [dates]);

    // Cargar condicionalmente un Titulo
    const title = Object.keys(dates).length === 0 ? 'No hay citas' : 'Administrar las citas aqui';

    return (
        <Fragment>
            <h1>Administrador de Pacientes</h1>
            <div className="container">
                <div className="row">
                    <div className="one-half column">
                        <Form createDate={createDate} />
                    </div>
                    <div className="one-half column">
                        <h2>{title}</h2>
                        {dates.map((date, index) => (
                            <Date key={index} index={index} date={date} deleteDate={deleteDate} />
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
