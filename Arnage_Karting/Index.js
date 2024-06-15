const express = require('express')
const bodyParser = require('body-parser')
const Users = require('./models/Users')
const Races = require('./models/Races')
const nodemailer = require('nodemailer')
const sequelize = require('./database/Index')

const app = express();
app.use(express.json());
app.use(bodyParser.json());


//Llamada a BD y a la creación de las tablas de la BD
require('./database/Index')
require('./models/Users')


// Crear server
app.listen(3000, () => {    
    console.log('Servidor escuchando en http://localhost:3000')
})

//Uso de middleware
app.use(bodyParser.json());


// //Peticiones

//GET
app.get('/Users', async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(Users);
    } catch (error) {
        res.status(500).send('Error al leer datos de la tabla Users');
    }
});

app.get('/Races', async (req, res) => {
   try {
       const races = await Races.findAll();
       res.json(Races);
   } catch (error) {
       res.status(500).send('Error al leer datos de la tabla Racers')
   }
})

//POST

// Configurador de nodeMailer
const transporter = nodemailer.createTransport({
    host: 'smtp.ethernal.email', //config con mail test de Ethernal
    port: 587,
    secure: false,
    auth: {
        user: '',
        pass: ''
    }
});

app.post('/Users', async (req, res) => {
    try {
        const user = await Users.create({user_name: 'Fernando', user_lastname: 'Alonso', user_mail: 'fernando@alonso.com'});  //Inculí los datos en el create - probar
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
});

app.post('/Races', async (req, res) => {
    try {
        const race = await Races.create({event_name: 'Copa Pistón', date: '08/06/2024', time: '12:30', availability: 'Sí'})
        res.status(200).json(race);

        const maxRaces = 3; //Número máximo de carreras que se pueden hacer en un día
        const racesCount= await races.count();
        
        if (racesCount >= maxRaces) {
            return res.status(400).json({error: 'No hay slots disponibles'});
        }
                
        const races = new races(req.body);         
        await races.save();

        // Configuración del mail
        const mailOptions = {
        from: '', //Mail del negocio
        to: Users.email,
        subject: 'Confirmación de registro',
        text: `Hola ${Users.user_name}, has reservado corrrectamente tu espacio el ${Races.date}`
        };

        // Enviar mail
        transporter.sendMail(mailOptions, (error) => {  
        if (error) {
            return res.status(500).json({error: error.message});
        } else {
            res.status(200).json({message: 'Usuario creado y correo enviado', users: user_name});
        } 
        });

    } catch (error) {
        res.status(400).json({ error: err.message })
    }
});


// PUT
 app.put('/Races/:event_name', async (req, res) => {
    
     const { event_name, date, time } = req.body;

     try {
         const race = await Races.findByPkAndUpdate(req.params.event_name, req.body);
         if (!race) {
             return res.status(404).json({error: 'Carrera no encontrada'})
         }

         if (event_name !== undefined) {
             race.event_name = event_name;
         }
         if (date !== undefined) {
             race.date = date;
         }
         if (time !== undefined) {
             race.time = time;
         }

         await race.save();
         res.status(200).json(race);
     } catch (error) {
         res.status(500).json({error:error.message});
     }});

     //Enviar mail de notificación de modificación
     // Configuración del mail
     const mailUpdate = {
         from: '',  //Mail del negocio
         to: Users.email,
         subject: 'Modificación de datos',
         text: `Hola ${Users.user_name}, se han modificado tus datos.
             Nombre delevento: ${Races.event_name} 
             Fecha: ${Races.date} 
             Hora: ${Races.time}`
     };

 transporter.sendMail(mailUpdate, (error, res) => {
      if (error) {
          //res.status(500).json({ error: error.message });
      } else {
          res.status(200).json({message: 'Datos actualizados'});
      } 
  })

 //DELETE
app.delete('/Users/:user_name', async (req, res) => {
    try {
        const users = await Users.findByIdAndDelete(req.params.user_name)
        if (!users) {                                      
            return res.status(404).send()       
        }
    } catch(error) {
        res.status(500).send({ error: error.message })
    }});

app.delete('/Races/:event_name', async (req, res) => {
    try {
        const races = await Races.findByIdAndDelete(req.params.event_name)
        if (!races) {
            return res.status(404).send()
        }
    } catch(error) {
        res.status(500).send({ error: error.message })
    }});

// Rutas erróneas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
  });