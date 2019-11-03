const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mysql = require('mysql');
const bodyParser = require('body-parser');

const cors = require('cors');

// Se agrega la librería para habilitar cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// parse application/json
app.use(bodyParser.json({ extended: true, limit: '10mb' }));

//Parámetros de la conexión a la base de datos
const db = mysql.createConnection({
    host: "tumap.mysql.database.azure.com",
    user: "tumaproot@tumap",
    password: "Analisis2*",
    database: "tumap",
    port: 3306,
    multipleStatements: true,
});

//Realizar la conexión a la base de datos
db.connect(function(error) {
    if (error)
        console.log(error);
    else
        console.log(`Base de datos conectada!`);
});

app.get('/', function(req, res) {
    console.log('Página de Inicio ');
    res.send("Bienvenidos al servidor <strong> TuMap </strong>");
});

//Manejo de Rutas Select users
app.route('/users')
    .get((req, res) => {
        console.log('Consultar datos ');
        const query = db.query('select * from users', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })

//Manejo de Rutas Select users por id
app.route('/users/:id')
    .get((req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM users WHERE id='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })

//Agregar Usuarios
app.route('/users')
    .post((req, res) => {
        const dato = {
            name: req.body.name,
            lastname: req.body.lastname,
            identification_card: req.body.identification_card,
            email: req.body.email,
            Rol_idRol: req.body.Rol_idRol,
        };

        const sql = `INSERT INTO users SET name='${dato.name}', lastname='${dato.lastname}', identification_card='${dato.identification_card}', email='${dato.email}', Rol_idRol='${dato.Rol_idRol}'`;

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })

//Actualizar Usuarios
app.route('/users/:id')
    .put((req, res) => {
        const id = req.params.id;
        const dato = {
            name: req.body.name,
            lastname: req.body.lastname,
            identification_card: req.body.identification_card,
            email: req.body.email,
            Rol_idRol: req.body.Rol_idRol,
        };

        let sets = [],
            i;
        for (i in dato) {
            if (dato[i] || dato[i] == 0) {
                sets.push(`${i}='${dato[i]}'`);
            }
        }

        const sql = `UPDATE users SET ${sets.join(', ')} WHERE id_User='${id}';`;

        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })

//Eliminar Usuarios
app.route('/users/:id')
    .delete((req, res) => {
        const id = req.params.id;
        const sql = `DELETE FROM users WHERE id_User='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })


// -------------------------------------------------------------------------
// -------------------------------------------------------------------------

//Manejo de Rutas Select coverages // Coverturas
app.route('/coverages')
    .get((req, res) => {
        console.log('Consultar datos');
        var query = db.query('select * from coverages', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })

//Manejo de Rutas Select coverages por id
app.route('/coverages/:id')
    .get((req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM coverages WHERE id_Coverage='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })

//Agregar coverages
app.route('/coverages')
    .post((req, res) => {
        const dato = {
            color: req.body.color,
            pressure: req.body.pressure,
            type: req.body.type,
        };

        const sql = `INSERT INTO coverages SET color='${dato.color}', pressure='${dato.pressure}', type='${dato.type}'`;

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })

//Actualizar coverages
app.route('/coverages/:id')
    .put((req, res) => {
        const id = req.params.id;
        const dato = {
            color: req.body.color,
            other_color: req.body.other_color,
            pressure: req.body.pressure,
            type: req.body.type,
        };

        let sets = [];
        for (i in dato) {
            if (dato[i] || dato[i] == 0) {
                sets.push(`${i}='${dato[i]}'`);
            }
        }

        const sql = `UPDATE coverages SET ${sets.join(', ')} WHERE id_Coverage='${id}';`;

        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })

//Eliminar coverages
app.route('/coverages/:id')
    .delete((req, res) => {
        const id = req.params.id;
        const sql = `DELETE FROM coverages WHERE id_Coverage='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })

// -------------------------------------------------------------------------
// -------------------------------------------------------------------------

//Manejo de Rutas Select without_coverage // Coverturas
app.route('/without_coverage')
    .get((req, res) => {
        console.log('Consultar datos');
        var query = db.query('select * from without_coverage', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })

//Manejo de Rutas Select without_coverage por id
app.route('/without_coverage/:id')
    .get((req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM without_coverage WHERE id_Without_coverage='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })

//Agregar without_coverage
app.route('/without_coverage')
    .post((req, res) => {
        const dato = {
            state: req.body.state,
        };

        const sql = `INSERT INTO without_coverage SET state='${dato.state}'`;

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })

//Actualizar without_coverage
app.route('/without_coverage/:id')
    .put((req, res) => {
        const id = req.params.id;
        const dato = {
            state: req.body.state,
        };

        let sets = [];
        for (i in dato) {
            if (dato[i] || dato[i] == 0) {
                sets.push(`${i}='${dato[i]}'`);
            }
        }

        const sql = `UPDATE without_coverage SET ${sets.join(', ')} WHERE id_Without_coverage='${id}';`;

        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })

//Eliminar without_coverage
app.route('/without_coverage/:id')
    .delete((req, res) => {
        const id = req.params.id;
        const sql = `DELETE FROM without_coverage WHERE id_Without_coverage='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })


// -------------------------------------------------------------------------
// -------------------------------------------------------------------------

//Manejo de Rutas Select grown // Crecidas
app.route('/grown')
    .get((req, res) => {
        console.log('Consultar datos');
        var query = db.query('select * from grown', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })

//Manejo de Rutas Select grown por id
app.route('/grown/:id')
    .get((req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM grown WHERE id_Grown='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })

//Agregar grown
app.route('/grown')
    .post((req, res) => {
        const dato = {
            level: req.body.level,
        };

        const sql = `INSERT INTO grown SET level='${dato.level}',`;

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })

//Actualizar grown
app.route('/grown/:id')
    .put((req, res) => {
        const id = req.params.id;
        const dato = {
            level: req.body.level,
        };

        let sets = [];
        for (i in dato) {
            if (dato[i] || dato[i] == 0) {
                sets.push(`${i}='${dato[i]}'`);
            }
        }

        const sql = `UPDATE grown SET ${sets.join(', ')} WHERE id_Grown='${id}';`;

        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })

//Eliminar grown
app.route('/grown/:id')
    .delete((req, res) => {
        const id = req.params.id;
        const sql = `DELETE FROM grown WHERE id_Grown='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })

// -------------------------------------------------------------------------
// -------------------------------------------------------------------------

//Manejo de Rutas Select connections // Conexiones
app.route('/connections')
    .get((req, res) => {
        console.log('Consultar datos');
        var query = db.query('select * from connections', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })

//Manejo de Rutas Select connections por id
app.route('/connections/:id')
    .get((req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM connections WHERE id_Connections='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })

//Agregar grown
app.route('/connections')
    .post((req, res) => {
        const dato = {
            description: req.body.description,
            image: req.body.image,
        };

        const sql = `INSERT INTO connections SET description='${dato.description}', image='${dato.image}'`;

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })

//Actualizar connections
app.route('/connections/:id')
    .put((req, res) => {
        const id = req.params.id;
        const dato = {
            description: req.body.description,
            image: req.body.image,
        };

        let sets = [];
        for (i in dato) {
            if (dato[i] || dato[i] == 0) {
                sets.push(`${i}='${dato[i]}'`);
            }
        }

        const sql = `UPDATE connections SET ${sets.join(', ')} WHERE id_Connections='${id}';`;

        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })

//Eliminar connections
app.route('/connections/:id')
    .delete((req, res) => {
        const id = req.params.id;
        const sql = `DELETE FROM connections WHERE id_Connections='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })

// -------------------------------------------------------------------------
// -------------------------------------------------------------------------

//Manejo de Rutas Select ethnobotany // Conexiones
app.route('/ethnobotany')
    .get((req, res) => {
        console.log('Consultar datos');
        var query = db.query('select * from ethnobotany', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })

//Manejo de Rutas Select ethnobotany por id
app.route('/ethnobotany/:id')
    .get((req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM ethnobotany WHERE id_Ethnobotany='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })

//Agregar ethnobotany
app.route('/ethnobotany')
    .post((req, res) => {
        const dato = {
            common_name: req.body.common_name,
            image: req.body.image,
            use: req.body.use,
        };

        const useField = '`use`';
        const sql = `INSERT INTO ethnobotany SET common_name='${dato.common_name}', image='${dato.image}', ${useField}='${dato.use}'`;
        console.log(sql);
        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })

//Actualizar ethnobotany
app.route('/ethnobotany/:id')
    .put((req, res) => {
        const id = req.params.id;
        const dato = {
            common_name: req.body.common_name,
            image: req.body.image,
            use: req.body.use,
        };
        const sets = [];
        for (i in dato) {
            if (i == 'use') {
                sets.push('`use`' + `='${dato[i]}'`);
            } else if (dato[i] || dato[i] == 0) {
                sets.push(`${i}='${dato[i]}'`);
            }
        }

        const sql = `UPDATE ethnobotany SET ${sets.join(', ')} WHERE id_Ethnobotany='${id}';`;

        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })

//Eliminar ethnobotany
app.route('/ethnobotany/:id')
    .delete((req, res) => {
        const id = req.params.id;
        const sql = `DELETE FROM ethnobotany WHERE id_Ethnobotany='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })

//Location

//Select Location
app.route('/location')
    .get((req, res) => {
        console.log('Consultar datos');
        var query = db.query('select * from location', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })

//Manejo de Rutas Select lacation por id
app.route('/location/:id')
    .get((req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM location WHERE id_Location='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })


//Insercion datos location

app.route('/location')
    .post((req, res) => {
        const dato = {
            ubicacion: req.body.ubicacion,
            users_id_User: req.body.users_id_User

        };

        const sql = `INSERT INTO location SET ubicacion='${dato.ubicacion}', users_id_User='${dato.users_id_User}'`;
        console.log(sql);
        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })


/********************************************************************** 
 * Servicios para levantamiento infromación predial
 ***********************************************************************/
const router = express.Router();

// Manejador de ruta uso predio

router
    .get('/usopredio', (req, res) => {
        console.log('Consultar datos uso_Predio');
        var query = db.query('select * from uso_Predio', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .get('/usopredio/:id', (req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM uso_Predio WHERE id_predio='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(data)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .post('/usopredio', (req, res) => {
        const dato = {
            descripcion: req.body.descripcion,
        };

        const sql = `INSERT INTO uso_Predio SET descripcion='${dato.descripcion}';`;

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .put('/usopredio/:id', (req, res) => {

        const id = req.params.id;
        const dato = {
            descripcion: req.body.descripcion,
        };

        let sets = [];
        for (i in dato) {
            if (dato[i] || dato[i] == 0) {
                sets.push(`${i}='${dato[i]}'`);
            }
        }

        const sql = `UPDATE uso_Predio SET ${sets.join(', ')} WHERE id_predio='${id}';`;

        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .delete('/usopredio/:id', (req, res) => {
        const id = req.params.id;
        const sql = `DELETE FROM uso_Predio WHERE id_predio='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    });

// Manejador de ruta servicios públicos

router
    .get('/sp', (req, res) => {
        console.log('Consultar datos servicios_Publicos');
        var query = db.query('select * from servicios_Publicos', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .get('/sp/:id', (req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM servicios_Publicos WHERE id_servpub='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(data)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .post('/sp', (req, res) => {
        const dato = {
            descripcion: req.body.descripcion,
        };

        const sql = `INSERT INTO servicios_Publicos SET descripcion='${dato.descripcion}';`;

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .put('/sp/:id', (req, res) => {

        const id = req.params.id;
        const dato = {
            descripcion: req.body.descripcion,
        };

        let sets = [];
        for (i in dato) {
            if (dato[i] || dato[i] == 0) {
                sets.push(`${i}='${dato[i]}'`);
            }
        }

        const sql = `UPDATE servicios_Publicos SET ${sets.join(', ')} WHERE id_servpub='${id}';`;

        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .delete('/sp/:id', (req, res) => {
        const id = req.params.id;
        const sql = `DELETE FROM servicios_Publicos WHERE id_servpub='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    });

// Manejador de ruta Nivel vivienda

router
    .get('/nivel', (req, res) => {
        console.log('Consultar datos Nivel vivienda');
        var query = db.query('select * from nivel_Vivienda', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .get('/nivel/:id', (req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM nivel_Vivienda WHERE id_nivel='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(data)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .post('/nivel', (req, res) => {
        const dato = {
            descripcion: req.body.descripcion,
        };

        const sql = `INSERT INTO nivel_Vivienda SET descripcion='${dato.descripcion}';`;

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .put('/nivel/:id', (req, res) => {

        const id = req.params.id;
        const dato = {
            descripcion: req.body.descripcion,
        };

        let sets = [];
        for (i in dato) {
            if (dato[i] || dato[i] == 0) {
                sets.push(`${i}='${dato[i]}'`);
            }
        }

        const sql = `UPDATE nivel_Vivienda SET ${sets.join(', ')} WHERE id_nivel='${id}';`;

        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .delete('/nivel/:id', (req, res) => {
        const id = req.params.id;
        const sql = `DELETE FROM nivel_Vivienda WHERE id_nivel='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    });

// Manejador de ruta Estratos

router
    .get('/estrato', (req, res) => {
        console.log('Consultar datos Estratos');
        var query = db.query('select * from estrato', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .get('/estrato/:id', (req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM estrato WHERE id_estrato='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(data)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .post('/estrato', (req, res) => {
        const dato = {
            descripcion: req.body.descripcion,
        };

        const sql = `INSERT INTO estrato SET descripcion='${dato.descripcion}';`;

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .put('/estrato/:id', (req, res) => {

        const id = req.params.id;
        const dato = {
            descripcion: req.body.descripcion,
        };

        let sets = [];
        for (i in dato) {
            if (dato[i] || dato[i] == 0) {
                sets.push(`${i}='${dato[i]}'`);
            }
        }

        const sql = `UPDATE estrato SET ${sets.join(', ')} WHERE id_estrato='${id}';`;

        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .delete('/estrato/:id', (req, res) => {
        const id = req.params.id;
        const sql = `DELETE FROM estrato WHERE id_estrato='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    });

// Manejador de ruta predios

router
    .get('/predios', (req, res) => {
        console.log('Consultar datos Predios');
        var query = db.query('select * from predios', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .get('/predios/:id', (req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM predios WHERE matricula='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(data)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .post('/predios', (req, res) => {
        const {
            matricula,
            uso_suelo,
            nivel_vivienda,
            limites,
            serv_publicos
        } = req.body;

        const dato = {
            matricula: matricula,
            direccion: 'Cl 7a Bis c 80 a 50',
            ide_estrato: 3,
            id_usosuelo: uso_suelo,
            ide_nivel: nivel_vivienda,
            estado_Vivienda: 1,
            servicio_agua: serv_publicos[0].length === 0 ? 1 : 0,
            servicio_energia: serv_publicos[1].length === 0 ? 1 : 0,
            servicio_internet: serv_publicos[2].length === 0 ? 1 : 0,
            servicio_telefoniaFija: serv_publicos[3].length === 0 ? 1 : 0,
            servicio_telefoniaMovil: serv_publicos[4].length === 0 ? 1 : 0,
            servicio_gasNatural: serv_publicos[5].length === 0 ? 1 : 0,
            servicio_gasPropano: serv_publicos[6].length === 0 ? 1 : 0,
        };

        const sql = `INSERT INTO predios SET matricula='${dato.matricula}',direccion='${dato.direccion}',ide_estrato='${dato.ide_estrato}',
        id_usosuelo='${dato.id_usosuelo}',ide_nivel='${dato.ide_nivel}',estado_Vivienda='${dato.estado_Vivienda}',servicio_agua='${dato.servicio_agua}',
        servicio_energia='${dato.servicio_energia}',servicio_internet='${dato.servicio_internet}',servicio_telefoniaFija='${dato.servicio_telefoniaFija}',
        servicio_telefoniaMovil='${dato.servicio_telefoniaMovil}',servicio_gasNatural='${dato.servicio_gasNatural}',servicio_gaspropano='${dato.servicio_gasPropano}';`;

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                result.message = 'ok'
                res.json(result)
            }
            console.log(result)
        });

        //res.json('ok')
    })
    .put('/predios/:id', (req, res) => {

        const id = req.params.id;
        const dato = {
            matricula: req.body.matricula,
            direccion: req.body.direccion,
            ide_estrato: req.body.ide_estrato,
            id_usosuelo: req.body.id_usosuelo,
            ide_nivel: req.body.ide_nivel,
            estado_Vivienda: req.body.estado_Vivienda,
            servicio_agua: req.body.servicio_agua,
            servicio_energia: req.body.servicio_energia,
            servicio_internet: req.body.servicio_internet,
            servicio_telefoniaFija: req.body.servicio_telefoniaFija,
            servicio_telefoniaMovil: req.body.servicio_telefoniaMovil,
            servicio_gasNatural: req.body.servicio_gasNatural,
            servicio_gasPropano: req.body.servicio_gasPropano,
        };

        let sets = [];
        for (i in dato) {
            if (dato[i] || dato[i] == 0) {
                sets.push(`${i}='${dato[i]}'`);
            }
        }

        const sql = `UPDATE predios SET ${sets.join(', ')} WHERE id_predio='${id}';`;

        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .delete('/predios/:id', (req, res) => {
        const id = req.params.id;
        const sql = `DELETE FROM predios WHERE id_predio='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    });

app.use(router);
/********************************************************************** 
 * FIN Servicios para levantamiento infromación predial
 ***********************************************************************/

// Manejador de ruta Registro de Información
app.route('/registro_info')
    .get(function(req, res) {
        console.log('Página de Registro de Información ');
        var query = db.query('select * from registro_info', function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result);
                res.json(result)
            }
        });
    })
    .post(function(req, res) {
        res.send('Add a rol');
    })
    .put(function(req, res) {
        res.send('Update the rol');
    });

// Manejador de ruta Administrador
app.route('/administrador')
    .get(function(req, res) {
        console.log('Página de Administradores ');
        var query = db.query('select * from administrador', function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result);
                res.json(result)
            }
        });
    })
    .post(function(req, res) {
        res.send('Add a rol');
    })
    .put(function(req, res) {
        res.send('Update the rol');
    });

// Manejador de ruta Validar Información
app.route('/validar_info')
    .get(function(req, res) {
        console.log('Página de Validar Información ');
        var query = db.query('select * from validar_info', function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result);
                res.json(result)
            }
        });
    })
    .post(function(req, res) {
        res.send('Add a rol');
    })
    .put(function(req, res) {
        res.send('Update the rol');
    });

//**************************************************************************
// dbo inicio 
//*Ej: http://localhost:3000/dbo_pregunta**********************************
app.route('/dbo_pregunta')
    .get(function(req, res) {
        console.log('Página de pregunta ');

        var sql = `select id, pregunta from tumap.dbo_pregunta order by orden; `;

        var query = db.query(sql, function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result);
                res.json(result);
            }
        });
    });


app.get('/dbo_preguntas-respuestas', (req, res) => {

    const sqlp = 'select id, orden, pregunta from tumap.dbo_pregunta order by orden;';
    const sqlr = 'Select id, orden, id_pregunta, 0 as id_inscripcion, nombre, ruta from tumap.dbo_imagen order by id_pregunta, orden;';

    let preguntas = [];
    let respuestas = [];

    db.query(sqlp, (error, result) => {
        if (error) {
            res.json({
                error: true,
                message: "Ocurrió un error al consultar las preguntas"
            });
        } else {
            // preguntas.concat(result);
            preguntas = result;
            // console.log(preguntas);

            db.query(sqlr, (error, result) => {
                if (error) {
                    res.json({
                        error: true,
                        message: "Ocurrió un error al consultar las respuestas"
                    });
                } else {
                    respuestas = result;
                    // console.log(respuestas);

                    if (preguntas) {

                        preguntas.map(p => {
                            p.respuestas = respuestas.filter(r => p.id === r.id_pregunta);
                        });
                        console.log(preguntas);
                        return res.json(preguntas);
                    } else {
                        res.json({
                            error: true,
                            message: "Ocurrió un error al consultar preguntas y respuestas"
                        });
                    }

                    res.json({ preguntas, respuestas });

                }
            });
        }
    });
});

// dbo Lista las imagen por imagensuelos 30/09/2019
app.route('/dbo_imagen')
    .get(function(req, res) {
        console.log('Página de imagen ');

        var sql = `Select id as id_imagen,id_pregunta,nombre,ruta from tumap.dbo_imagen order by id_pregunta, orden;`;

        var query = db.query(sql, function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result);
                res.json(result);
            }
        });
    });

// dbo Lista inscripciones por documento 30/09/2019

app.get('/dbo_inscripcion/:documento', function(req, res) {
    const { documento } = req.params;
    console.log('Página de inscripcion');
    var query = db.query('SELECT  * FROM dbo_inscripcion WHERE documento = ?', documento, function(error, result) {
        if (error) {
            throw error;
        } else {
            console.log(result);
            res.json(result);
        }
    });
})

app.post("/dbo_inscripcion", function(req, res) {
    var sql = "INSERT INTO dbo_inscripcion(documento,nombre,lat,lng,direccion,departamento,municipio,usuario,fecha)"
    sql = sql + ` VALUES ( ${req.body.documento} ,`
    sql = sql + `'${req.body.nombre}',`
    sql = sql + `'${req.body.lat}',`
    sql = sql + `'${req.body.lng}',`
    sql = sql + `'${req.body.direccion}',`
    sql = sql + `'${req.body.departamento}',`
    sql = sql + `'${req.body.municipio}',`
    sql = sql + `'${req.body.usuario}',CURDATE());`;
    console.log('Add inscripcion:', sql);
    var query = db.query(sql, function(error, result) {
        if (error) {
            throw error;
        } else {
            console.log(result);
            res.json(result);
            // var query = db.query('SELECT  * FROM dbo_inscripcion WHERE documento = ?', req.body.documento, function(error, result) {
            //     if (error) {
            //         throw error;
            //     } else {
            //         console.log(result);
            //         res.json(result);
            //     }
            // });
        }
    });
    // res.json({ text: 'Datos Ingresados: ' + sql });
})

app.put("/dbo_inscripcion/:id", function(req, res) {
    const { id } = req.params;

    var sql = ` UPDATE dbo_inscripcion SET `
    sql = sql + ` documento= ${req.body.documento} ,`
    sql = sql + ` nombre='${req.body.nombre}', `
    sql = sql + ` lat='${req.body.lat}', `
    sql = sql + ` lng='${req.body.lng}',`
    sql = sql + ` direccion='${req.body.direccion}', `
    sql = sql + ` departamento='${req.body.departamento}', `
    sql = sql + ` municipio='${req.body.municipio}',`
    sql = sql + ` usuario='${req.body.usuario}' `
    sql = sql + ` WHERE id= ${id};`;

    var query = db.query(sql, function(error, result) {
        if (error) {
            throw error;
        } else {
            console.log(result);
            res.json(result);
        }
    });

    // res.json({ text: 'Datos Actualizados ' + sql });
});

// dbo Lista respuestas 30/09/2019
// http://localhost:3000/dbo_respuesta/
app.get('/dbo_respuesta/:documento', function(req, res) {

    const { documento } = req.params;

    var query = db.query('SELECT count(*) count FROM tumap.dbo_respuesta WHERE id_inscripcion = ?;', documento, function(error, result) {
        if (error) {
            throw error;
        } else {
            console.log(result);
            res.json(result);
        }
    });

})


app.post("/dbo_respuesta", function(req, res) {

    const data = req.body;
    // console.log(req.body);

    const errors = 0;
    console.log(JSON.stringify(data));
    data.map(item => {
        const sql = `INSERT INTO dbo_respuesta (id_inscripcion,id_pregunta,id_imagen) VALUES (${item.id_inscripcion},${item.id_pregunta},${item.id});`;
        console.log('Add inscripcion:', sql);
        db.query(sql, function(error, result) {
            if (error) {
                errors++;
                console.log(error)
            }
        });

    });

    if (errors) {
        res.json({ success: false, error: `Se presentaron (${errors}) errores al guardar la respuesta` });
    } else {
        res.json({ success: true });

    }
})


app.put('/dbo_respuesta', function(req, res) {
    res.json({ message: 'Update dbo_respuesta' });
});

// dbo Lista las respuestas con texto vlistado 30/09/2019
app.route('/dbo_vlistado')
    .get(function(req, res) {
        console.log('Página de vlistado ');

        const sql = 'SELECT documento,orden,nombre,lat,lng,departamento,municipio,fecha,pregunta,imagen FROM dbo_vlistado;';

        db.query(sql, (error, result) => {
            if (error) {
                res.status(400).send('<h1>Ocurrió un error al consultar las encuestas.</h1>');
            } else {
                const style = 'style="border: 1px solid black;"';
                let html = '<table style="width:100%; border: 1px solid black;">';
                html = html + `
                        <tr ${style}>
                            <td ${style}>documento</td>
                            <td ${style}>orden</td>
                            <td ${style}>nombre</td>
                            <td ${style}>lat</td>
                            <td ${style}>lng</td>
                            <td ${style}>departamento</td>
                            <td ${style}>municipio</td>
                            <td ${style}>fecha</td>
                            <td ${style}>pregunta</td>
                            <td ${style}>imagen</td>
                        </tr>
                    `
                for (let i in result) {
                    html = html + `
                        <tr ${style}>
                            <td ${style}>${result[i].documento}</td>
                            <td ${style}>${result[i].orden}</td>
                            <td ${style}>${result[i].nombre}</td>
                            <td ${style}>${result[i].lat}</td>
                            <td ${style}>${result[i].lng}</td>
                            <td ${style}>${result[i].departamento}</td>
                            <td ${style}>${result[i].municipio}</td>
                            <td ${style}>${result[i].fecha}</td>
                            <td ${style}>${result[i].pregunta}</td>
                            <td ${style}>${result[i].imagen}</td>
                        </tr>
                        `;
                }
                html = html + '</table>';
                res.send(html);
            }
        });



    });

// dbo Listar todos las respuestas con ids vlistadotodo 30/09/2019
app.route('/dbo_vlistadotodo')
    .get(function(req, res) {
        console.log('Página de vlistadotodo ');
        var query = db.query('SELECT * FROM dbo_vlistadotodo', function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result);
                res.json(result);
            }
        });
    });

//*********************************************************************************** */
// dbo Fin 
//************************************************************************************ */


/*************************************************************************************
 * Servicios para el inventario de redes secas
 *************************************************************************************/

app.get('/irs-tipos-redes', (req, res) => {
    const sql = 'SELECT id, nombre, icono FROM irs_tipos_redes';
    db.query(sql, (error, result) => {
        if (error) {
            res.json({
                error: true,
                message: "Ocurrió un error al consultar los tipos de redes"
            });
        } else {
            res.json(result);
        }
    });
});

app.get('/irs-estados-redes', (req, res) => {
    const sql = 'SELECT id, nombre FROM irs_estados_redes';
    db.query(sql, (error, result) => {
        if (error) {
            res.json({
                error: true,
                message: "Ocurrió un error al consultar los estados de las redes"
            });
        } else {
            res.json(result);
        }
    });
});

app.get('/irs-tipos-materiales', (req, res) => {
    const sql = 'SELECT id, nombre FROM irs_materiales_postes';
    db.query(sql, (error, result) => {
        if (error) {
            res.json({
                error: true,
                message: "Ocurrió un error al consultar los tipos de materiales"
            });
        } else {
            res.json(result);
        }
    });
});

app.get('/irs-operadores-celulares', (req, res) => {
    const sql = 'SELECT id, nombre, logotipo FROM irs_operadores_celulares';
    db.query(sql, (error, result) => {
        if (error) {
            res.json({
                error: true,
                message: "Ocurrió un error al consultar los operadores celulares"
            });
        } else {
            res.json(result);
        }
    });
});

app.post('/irs-inventarios', (req, res) => {
    const data = req.body;
    const date = new Date().toISOString();
    data.fecha = date.substring(0, 10) + 'T' + date.substring(11, 19);

    const mapper = {
        tipo: 'tipo',
        clasePoste: 'clase_poste',
        idIrsMaterial: 'id_irs_material',
        identificador: 'identificador',
        tieneLampara: 'tiene_lampara',
        tieneTransformador: 'tiene_transformador',
        idIrsOperador: 'id_irs_operador',
        idIrsEstadoRed: 'id_irs_estado_red',
        ubicacion: 'ubicacion',
        imagen: 'imagen',
        idUsuario: 'id_usuario',
        idIrsOperadorCelular: 'id_irs_operador_celular',
        idIrsEstadoRedCelular: 'id_irs_estado_red_celular',
        fecha: 'fecha',
        ip: 'ip'
    }

    if (data.tipo == 'Postes') {
        if (data.tieneLampara != null) {
            data.tieneLampara = (data.tieneLampara) ? 'S' : 'N';
        }
        if (data.tieneTransformador != null) {
            data.tieneTransformador = (data.tieneTransformador) ? 'S' : 'N';
        }
    } else {
        data.clasePoste = '';
        data.tieneLampara = '';
        data.tieneTransformador = '';
    }

    let sets = [];
    for (let i in data) {
        if (data[i] || data[i] == '') {
            if (i != 'ubicacion') {
                sets.push(`${mapper[i]}='${data[i]}'`);
            } else {
                sets.push(`${mapper[i]}='${JSON.stringify(data[i])}'`);
            }
        }
    }

    const sql = `INSERT INTO irs_inventarios SET ${sets.join(', ')};`;

    db.query(sql, (error, result) => {
        if (error) {
            res.status(400).send(`${sql}`);
        } else {
            res.json(result);
        }
    });
});

app.get('/irs-inventarios-totales', (req, res) => {
    const sql = 'SELECT * FROM irs_inventarios_totales';
    db.query(sql, (error, result) => {
        if (error) {
            res.status(400).send('<h1>Ocurrió un error al consultar las encuestas.</h1>');
        } else {
            const style = 'style="border: 1px solid black;"';
            let html = '<table style="width:100%; border: 1px solid black;">';
            html = html + `
                <tr ${style}>
                    <td ${style}>id</td>
                    <td ${style}>tipo</td>
                    <td ${style}>clase poste</td>
                    <td ${style}>material</td>
                    <td ${style}>numero / empresa</td>
                    <td ${style}>tiene lámpara</td>
                    <td ${style}>tiene transformador</td>
                    <td ${style}>operador</td>
                    <td ${style}>estado</td>
                    <td ${style}>ubicacion</td>
                    <td ${style}>imagen</td>
                    <td ${style}>usuario</td>
                    <td ${style}>encuesta operador</td>
                    <td ${style}>encuesta estado</td>
                    <td ${style}>fecha</td>
                    <td ${style}>ip</td>
                </tr>
            `
            for (let i in result) {
                html = html + `
                <tr ${style}>
                    <td ${style}>${result[i].id}</td>
                    <td ${style}>${result[i].tipo}</td>
                    <td ${style}>${result[i].clase_poste}</td>
                    <td ${style}>${result[i].material}</td>
                    <td ${style}>${result[i].identificador}</td>
                    <td ${style}>${result[i].lampara}</td>
                    <td ${style}>${result[i].transformador}</td>
                    <td ${style}>${result[i].operador}</td>
                    <td ${style}>${result[i].estado}</td>
                    <td ${style}>${result[i].ubicacion}</td>
                    <td ${style}><img src="${result[i].imagen}" width="50" height="auto"/></td>
                    <td ${style}>${result[i].id_usuario}</td>
                    <td ${style}>${result[i].encuesta_operador}</td>
                    <td ${style}>${result[i].encuesta_estado}</td>
                    <td ${style}>${result[i].fecha}</td>
                    <td ${style}>${result[i].ip}</td>
                </tr>
                `;
            }
            html = html + '</table>';
            res.send(html);
        }
    });
});

/*************************************************************************************
 * Fin de servicios para el inventario de redes secas
 *************************************************************************************/

/***********************************************************
 * Servicio para la consulta de inventario de uso de Suelos*
 **********************************************************/
app.route('/suelos')
    .get((req, res) => {
        const sql = `SELECT r.ID, NOMBRE_PROPIETARIO, NOMBRE_PREDIO, AREA, DIRECCION, 
        asText(p.PREDIO) as PREDIO, asText(u.POLIGONO) as POLIGONOS, DESCRIPCION FROM IM_registros r, IM_predio p, 
        IM_tipo_usos t, IM_usos_predio u WHERE r.ID = p.ID_REGISTROS AND u.ID_PREDIO = p.ID AND u.ID_TIPO_USOS = t.ID`;
        db.query(sql, (error, result) => {
            if (error) {
                res.json({
                    error: true,
                    message: error.message
                });
            } else {
                res.json(result);
            }
        });
    })
    .post((req, res) => {
        let data = req.body;
        const sql = `INSERT INTO IM_REGISTROS (NOMBRE_PROPIETARIO, NOMBRE_PREDIO, AREA, DIRECCION)
        VALUES('${data.nombrePropietario}', '${data.nombrePredio}','${data.area}','${data.direccion}')`;
        db.query(sql, (error, result) => {
            if (error) {
                res.json({
                    error: true,
                    message: error.message
                })
            } else {
                res.json(result);
            }
        })
    });
// POST Para agregar Polígono principal 

// POST Para agregar subpolígonos 
app.post('/usosuelos', (req, res) => {
    let data = (req.body);
    let sql = `INSERT INTO IM_REGISTROS (NOMBRE_PROPIETARIO, NOMBRE_PREDIO, AREA, DIRECCION)
    VALUES('${data.nombrePropietario}', '${data.nombrePredio}','${data.area}','${data.direccion}');`;
    sql += `INSERT INTO IM_USOS_PREDIO (POLIGONO, ID_REGISTRO) VALUES( '${data.poligono}', ${data.idRegistro});`;
    db.query(sql, (error, result) => {
        if (error) {
            res.json({
                error: true,
                message: error.message
            });
        } else {
            res.json(result);
        }
    })
});

// POST Para consultar el tipo de uso de suelos

app.get('/tipousosuelos', (req, res) => {
    let data = (req.body);
    let sql = `SELECT * FROM IM_TIPO_USOS`;
    db.query(sql, (error, result) => {
        if (error) {
            res.json({
                error: true,
                message: error.message
            });
        } else {
            res.json(result);
        }
    })
});
app.get('/usosuelosid', (req, res) => {
    let sql = `select MAX(ID)+1 as lastID FROM im_registros;`;
    db.query(sql, (error, result) => {
        if (error) {
            res.json({
                error: true,
                message: error.message
            });
        } else {
            res.json(result);
        }
    })
});
/***************************************************
 * Fin de servicios para el inventario de suelos   *
 **************************************************/

//Llamado de encuesta social 
app.route('/encuesta-social')
    .get(function(req, res) {
        console.log('Método de Encuesta_Social');
        var query = db.query('select * from SEC_Encuesta_Social', function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result);
                res.json(result)
            }
        });
    })
    .post(function(req, res) {
        const data = req.body;
        console.log(data);
        const sql = `
            INSERT INTO SEC_Encuesta_Social(vinculo_territorial, alimentacion, seguridad, servicios_publicos, transporte)
        VALUES('${data.vinculo_territorial}','${data.alimentacion}','${data.seguridad}','${data.servicios_publicos}','${data.transporte}');
        `
        var query = db.query(sql, function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result);
                res.json(result)
            }
        });
    })
    .put(function(req, res) {
        res.send('Update the encuesta social');
    });
//Llamado de SEC_Establecimiento_Comercial
app.route('/establecimiento-comercial')
    .get(function(req, res) {
        console.log('Método de Establecimiento_Comercial ');
        var query = db.query('select * from SEC_Establecimiento_Comercial', function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result);
                res.json(result)
            }
        });
    })
    .post(function(req, res) {
        const data = req.body;
        console.log(data);
        const sql = `
        INSERT INTO SEC_Establecimiento_Comercial (Nombre_Establecimiento, Productos_Servicios, Descripcion , N_Empleados, Foto)
        VALUES ('${data.Nombre_Establecimiento}','${data.Productos_Servicios}','${data.Descripcion}','${data.N_Empleados}','${data.Foto}');
         `
        var query = db.query(sql, function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result);
                res.json(result)
            }
        });
    })
    .put(function(req, res) {
        res.send('Update the Establecimiento_Comercial');
    });

//Llamado de SEC_Comercio_Informal
app.route('/comercio-informal')
    .get(function(req, res) {
        console.log('Método de Comercio_Informal');
        var query = db.query('select * from SEC_Comercio_Informal', function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result);
                res.json(result)
            }
        });
    })
    .post(function(req, res) {
        const data = req.body;
        console.log(data);
        const sql = `
        INSERT INTO SEC_Comercio_Informal (Productos_Servicios, Descripcion , Estatico_Movil, Periodicidad, Jornada, Foto)
        VALUES ('${data.Productos_Servicios}','${data.Descripcion}','${data.Estatico_Movil}','${data.Periodicidad}','${data.Jornada}','${data.Foto}');
        `
        var query = db.query(sql, function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result);
                res.json(result)
            }
        });
    })
    .put(function(req, res) {
        res.send('Update the Comercio_Informal');
    });

//**************************************************************************
// * SERVICIOS PARA SENALIZACION | MOBILIARIO URBANO 
//**************************************************************************

/* MANEJADOR DE RUTA CATEGORIA DEL ITEM */
app.route('/categoria')
    .get(function(req, res) {
        console.log('Página de Validar Información ');
        var query = db.query('select * from jyd_categoria', function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result);
                res.json(result)
            }
        });
    })
    .post(function(req, res) {
        res.send('Add a rol');
    })
    .put(function(req, res) {
        res.send('Update the rol');
    });

/* MANEJADOR DE RUTA ITEMS SENALIZACION */
app.route('/item_senalizacion')
    .get(function(req, res) {
        console.log('Página de Validar Información ');
        var query = db.query('select * from jyd_item where fk_categoria=1 order by nombre', function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result);
                res.json(result)
            }
        });
    })
    .post(function(req, res) {
        res.send('Add a rol');
    })
    .put(function(req, res) {
        res.send('Update the rol');
    });

/* MANEJADOR DE RUTA ITEMS MOBILIARIO URBANO */
app.route('/item_mobiliario')
    .get(function(req, res) {
        console.log('Página de Validar Información ');
        var query = db.query('select * from jyd_item where fk_categoria=2 order by nombre', function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result);
                res.json(result)
            }
        });
    })
    .post(function(req, res) {
        res.send('Add a rol');
    })
    .put(function(req, res) {
        res.send('Update the rol');
    });

app.route('/item/:id_item')
    .get(function(req, res) {
        const id_item = req.params.id_item;
        const sql = `SELECT i.pk_id_item,i.nombre,c.descripcion FROM jyd_item i, jyd_categoria c where i.pk_id_item='${id_item}' and i.fk_categoria=c.pk_id_categoria;`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(data)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })

/* MANEJADOR DE RUTA ESTADO DE REGISTRO DEL ITEM */
app.route('/estado')
    .get(function(req, res) {
        console.log('Página de Validar Información ');
        var query = db.query('select * from jyd_estado', function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result);
                res.json(result)
            }
        });
    })
    .post(function(req, res) {
        res.send('Add a rol');
    })
    .put(function(req, res) {
        res.send('Update the rol');
    });

/* MANEJADOR DE RUTA REGISTRO DEL ITEM */
app.route('/registro_item')
    .get(function(req, res) {
        console.log('Página de Validar Información ');
        var query = db.query('select r.fk_users as id_user, i.nombre nombre_item, c.descripcion categoria, a.latitud, a.longitud, e.descripcion estado, a.descripcion descripcion, a.imagen from jyd_registro r, jyd_registro_has_item a, jyd_item i, jyd_estado e, jyd_categoria c where pk_id_registro=fk_id_registro and pk_id_estado=fk_estado and pk_id_item=fk_id_item and c.pk_id_categoria=i.fk_categoria;', function(error, result) {
            if (error) {
                throw error;
            } else {
                console.log(result);
                res.json(result)
            }
        });
    })
    .post(function(req, res) {
        let data = req.body;
        const sql = `INSERT INTO jyd_registro (fk_users, fecha_registro)
        VALUES(${data.idUsuario}, '${data.fecha}')`;
        db.query(sql, (error, result) => {
            if (error) {
                res.json({
                    error: true,
                    message: error.message
                })
            } else {
                res.json(result);
            }
        })
    })
    .put(function(req, res) {
        res.send('Update the rol');
    });

app.route('/historico_item')
    .post(function(req, res) {
        let data = req.body;
        const sql = `INSERT INTO jyd_registro_has_item (fk_id_registro, fk_id_item, latitud, longitud, imagen, descripcion, fk_estado)
        VALUES(1, ${data.codItem}, ${data.lat}, ${data.lng}, '${data.imagen}', '${data.descripcion}', ${data.estadoItem})`;
        // console.log(sql);
        db.query(sql, (error, result) => {
            if (error) {
                res.json({
                    error: true,
                    message: error.message
                })
            } else {
                res.json(result);
            }
        })
    });

/*************************************************************
 * FIN DE SERVICIOS PARA SENALIZACION | MOBILIARIO URBANO    *
 ************************************************************/

/***************************************************
 * Comienzo de servicios para vias   *
 **************************************************/

// Manejador de ruta vias

router
    .get('/vias', (req, res) => {
        console.log('Consultar datos jf_descripcion_via');
        var query = db.query('select h.latitud, h.longitud, h.nombre_via, h.imagen, dv.detalle from jf_descripcion_via h, jf_detalle_via dv where h.id_detalle_via = dv.id;', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .get('/detalle_vias', (req, res) => {
        console.log('Consultar datos jf_detalle_via');
        var query = db.query('SELECT * FROM tumap.jf_detalle_via', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .get('/detalle_vias/:id', (req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM jf_detalle_via WHERE id='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(data)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .post('/vias', (req, res) => {
        const dato = req.body;
        const puntos = `ST_GeomFromText('POINT${dato.ubicacion}')`;
        const sql = `INSERT INTO jf_descripcion_via (latitud, longitud, nombre_via, id_detalle_via, imagen, id_estado)
            values (${dato.lat}, ${dato.lng}, '${dato.direccion}', ${dato.detalle}, '${dato.imagen}', 1)`;
        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .put('/vias/:id', (req, res) => {

        const id = req.params.id;
        const dato = req.body;


        const sql = `UPDATE jf_descripcion_via SET id_estado = ${dato.id_estado} WHERE id='${id}';`;

        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .delete('/vias/:id', (req, res) => {
        const id = req.params.id;
        const sql = `DELETE FROM jf_descripcion_via WHERE id='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    });
app.use(router);


/***************************************************
 * Fin de servicios para vias   *
 **************************************************/

/***************************************************
 * Comienzo de servicios para Minas   *
 **************************************************/
// MP_EstadoActual_mina

router
    .get('/Minas/EstadoActual', (req, res) => {
        console.log('Consultar datos MP_EstadoActual_mina');
        var query = db.query('select * from MP_EstadoActual_mina', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .get('/Minas/EstadoActual/:id_estadomina', (req, res) => {
        const id_estadomina = req.params.id_estadomina;
        const sql = `SELECT * FROM MP_EstadoActual_mina WHERE id_estadomina='${id_estadomina}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(data)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .post('/Minas/EstadoActual', (req, res) => {
        const dato = req.body

        const sql = `INSERT INTO MP_EstadoActual_mina (nombre_estadomina)
        values ('${dato.nombre_estadomina}')`;

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .put('/Minas/EstadoActual', (req, res) => {

        const dato = req.body

        const sql = `UPDATE MP_EstadoActual_mina SET nombre_estadomina = '${dato.nombre_estadomina}' WHERE id_estadomina = '${dato.id_estadomina}';`;

        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .delete('/Minas/EstadoActual/:id_estadomina', (req, res) => {
        const id_estadomina = req.params.id_estadomina;
        const sql = `DELETE FROM MP_EstadoActual_mina WHERE id_estadomina = '${id_estadomina}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    });

// MP_tipo_material 

router
    .get('/Minas/TipoMaterial', (req, res) => {
        console.log('Consultar datos MP_tipo_material');
        var query = db.query('select * from MP_tipo_material', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .get('/Minas/TipoMaterial/:id_tipomaterial', (req, res) => {
        const id_tipomaterial = req.params.id_tipomaterial;
        const sql = `SELECT * FROM MP_tipo_material WHERE id_tipomaterial='${id_tipomaterial}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(data)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .post('/Minas/TipoMaterial', (req, res) => {
        const dato = req.body
        const sql = `INSERT INTO MP_tipo_material (nombre_tipomaterial)
        values ('${dato.nombre_tipomaterial}')`;

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .put('/Minas/TipoMaterial', (req, res) => {

        const dato = {
            id_tipomaterial: req.body.id_tipomaterial,
            nombre_tipomaterial: req.body.nombre_tipomaterial,
        };

        const sql = `UPDATE MP_tipo_material SET  nombre_tipomaterial = '${dato.nombre_tipomaterial}' WHERE id_tipomaterial='${dato.id_tipomaterial}';`;

        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .delete('/Minas/TipoMaterial/:id_tipomaterial', (req, res) => {
        const id_tipomaterial = req.params.id_tipomaterial;
        const sql = `DELETE FROM MP_tipo_material WHERE id_tipomaterial='${id_tipomaterial}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    });

//MP_Sistema_Explotacion

router
    .get('/Minas/SistemaExplotacion', (req, res) => {
        console.log('Consultar datos MP_Sistema_Explotacion');
        var query = db.query('select * from MP_Sistema_Explotacion', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .get('/Minas/SistemaExplotacion/:id_sistemaexplotacion', (req, res) => {
        const id_sistemaexplotacion = req.params.id_sistemaexplotacion;
        const sql = `SELECT * FROM MP_Sistema_Explotacion WHERE id_sistemaexplotacion='${id_sistemaexplotacion}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(data)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .post('/Minas/SistemaExplotacion', (req, res) => {
        const dato = req.body

        const sql = `INSERT INTO MP_Sistema_Explotacion (nombre_sistemaexplotacion)
        values ('${dato.nombre_sistemaexplotacion}')`;

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .put('/Minas/SistemaExplotacion', (req, res) => {

        const dato = {
            id_sistemaexplotacion: req.body.id_sistemaexplotacion,
            nombre_sistemaexplotacion: req.body.nombre_sistemaexplotacion,
        };
        const sql = `UPDATE MP_Sistema_Explotacion SET nombre_sistemaexplotacion = '${dato.nombre_sistemaexplotacion}' WHERE id_sistemaexplotacion='${dato.id_sistemaexplotacion}';`;

        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .delete('/Minas/SistemaExplotacion/:id_sistemaexplotacion', (req, res) => {
        const id_sistemaexplotacion = req.params.id_sistemaexplotacion;
        const sql = `DELETE FROM MP_Sistema_Explotacion WHERE id_sistemaexplotacion='${id_sistemaexplotacion}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    });

//MP_Registro_Mina

router
    .get('/Minas/RegistroMina', (req, res) => {
        console.log('Consultar datos MP_Registro_Mina');
        var query = db.query('select * from MP_Registro_Mina', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .get('/Minas/RegistroMina/:id_registromina', (req, res) => {
        const id_registromina = req.params.id_registromina;
        const sql = `SELECT * FROM MP_Registro_Mina WHERE id_registromina='${id_registromina}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(data)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    .post('/Minas/RegistroMina', (req, res) => {
        const dato = req.body

        const sql = `INSERT INTO MP_Registro_Mina (nombre_sesion,ubicacion, mineral, trabajadores, observacion, id_sistemaexplotacion, id_tipomaterial, id_estadomina,estadoregistro,pregunta)
            values ('${dato.nombre_sesion}',
            GeomFromText('${dato.ubicacion}'),
             '${dato.mineral}',
              '${dato.trabajadores}',
               '${dato.observacion}',
                '${dato.id_sistemaexplotacion}',
                 '${dato.id_tipomaterial}',
                  '${dato.id_estadomina}', '${dato.estadoregistro}','${dato.pregunta}')`;

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .put('/Minas/RegistroMina', (req, res) => {

        const dato = {
            id_registromina: req.params.id_registromina,
            nombre: req.body.nombre_sesion,
            ubicacion: req.body.ubicacion,
            mineral: req.body.mineral,
            trabajadores: req.body.trabajadores,
            observacion: req.body.observacion,
            id_sistemaexplotacion: req.body.id_sistemaexplotacion,
            id_tipomaterial: req.body.id_tipomaterial,
            id_estadomina: req.body.id_estadomina,
            estadoregistro: req.body.estadoregistro,
            pregunta: req.body.pregunta,
        };


        const sql = `UPDATE MP_Registro_Mina SET 
        nombre = '${dato.nombre_sesion}',
        ubicacion = '${dato.ubicacion}',
        mineral = '${dato.mineral}',
        trabajadores = '${dato.trabajadores}',
        observacion = '${dato.observacion}',
        id_sistemaexplotacion = '${dato.id_sistemaexplotacion}',
        id_tipomaterial = '${dato.id_tipomaterial}',
        id_estadomina = '${dato.id_estadomina}',
        estadoregistro = '${dato.estadoregistro}',
        pregunta = '${dato.pregunta}'
        WHERE id_registromina='${dato.id_registromina}';`;

        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    .delete('/Minas/RegistroMina/:id_registromina', (req, res) => {
        const id_registromina = req.params.id_registromina;
        const sql = `DELETE FROM MP_Registro_Mina WHERE id_registromina='${id_registromina}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    });
app.use(router);

/***************************************************
 * Fin servicio Minas   *
 **************************************************/

/***************************************************
 * app_salud   *
 **************************************************/

app.post('/Datos-Establecimiento', (req, res) => {
    const data = req.body;
    const sql = `
    INSERT INTO cav_Datos_Establecimiento (
        Foto,
        Nit,
        Nom_Establecimiento,
        Direccion,
        Id_dpto_ciudad,
        Id_Tipo_Entidad,
        Observaciones,
        Id_Estado
    ) VALUES (
        '${data.Foto}',
        '${data.Nit}',
        '${data.Nombre_Establecimiento}',
        '${data.Direccion}',
        '${data.Id_dpto_ciudad}',
        '${data.Id_Tipo_Entidad}',
        '${data.Observaciones}',
        '${data.Id_Estado}'
    )`;

    db.query(sql, (error, result) => {
        if (error) {
            res.json({
                error: true,
                message: "Ocurrió un error al guardar el formulario"
            });
        } else {
            res.json(result);
        }
    });
});

app.get('/Tipo-Entidad', (req, res) => {
    const sql = 'SELECT * FROM cav_Tipo_Entidad';
    db.query(sql, (error, result) => {
        if (error) {
            res.json({
                error: true,
                message: error.message
            });
        } else {
            res.json(result);
        }
    });
});

app.get('/Listar-Departamentos', (req, res) => {
    const sql = "SELECT * FROM cav_dpto_ciudad WHERE tipo='D' ORDER BY nombre;";
    db.query(sql, (error, result) => {
        if (error) {
            res.json({
                error: true,
                message: "Ocurrió un error al consultar los departamentos"
            });
        } else {
            res.json(result);
        }
    });
});

app.get('/Listar-Ciudades/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM cav_dpto_ciudad WHERE tipo='C' AND id_ciudad='${id}' ORDER BY nombre;";
    db.query(sql, (error, result) => {
        if (error) {
            res.json({
                error: true,
                message: "Ocurrió un error al consultar las ciudades"
            });
        } else {
            res.json(result);
        }
    });
});

app.get('/Estado-Solic', (req, res) => {
    const sql = 'SELECT * FROM cav_Estado';
    db.query(sql, (error, result) => {
        if (error) {
            res.json({
                error: true,
                message: "Ocurrió un error al consultar el estado"
            });
        } else {
            res.json(result);
        }
    });
});

//Inicio de servidor NodeJS
app.listen(PORT, function() {
    console.log(`Server running at port ${PORT}`);
});