//Modulos
const express = require('express');
const mysql = require('mysql2');
//BodyParser
const bodyParser = require('body-parser');

var moment = require('moment');
var bcrypt = require('bcryptjs') 

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// MySql Connection
const connection = mysql.createConnection({
  host: 'us-cdbr-east-04.cleardb.com',
  user: 'b0c6cd4c0b3ae7',
  password: '9ed932ed',
  database: 'heroku_dd22c88bb0b436d',
  port:"3306"
});

/*connection.connect(error => {
    if (error) throw error;
    console.log("Database server Running!");
});*/

// Route
app.get('/', (req, res) => {
    res.send('Welcome to my API!');
  });

  //CRUD USUARIOS
  
  app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuario';
  
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send('No se encontraron resultados! Inténtelo nuevamente');
      }
    });
  });
  
  app.get('/usuario/:idusuario', (req, res) => {
    const { idusuario } = req.params;
    const sql = `SELECT * FROM usuario WHERE idusuario = ${idusuario}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
  
      if (result.length > 0) {
        res.json(result);
      } else {
        res.send('No se encontraron resultados! Inténtelo nuevamente');
      }
    });
  });
  
  app.post('/usuarios', (req, res) => {
    const sql = 'INSERT INTO usuario SET ?';
    bcrypt.genSalt(10,function(err,salt){  
        bcrypt.hash(req.body.contraseña,salt,function(err,hash){  
            const userObj = {
                idusuario: req.body.idusuario,
                nombres:req.body.nombres,
                apellidos:req.body.apellidos,
                correo:req.body.correo,
                contraseña:hash,
                telefono:req.body.telefono,
                direccion:req.body.direccion,
                imagen:req.body.imagen,  
              };
              connection.query(sql, userObj, error => {
                if (error) throw error;
                res.send('Usuario '+req.body.nombres+' '+req.body.apellidos+' Creado!');
              });
       });  
  });
    });
  
  app.put('/usuario/:idusuario', (req, res) => {
    const { idusuario} = req.params;
    const { nombres,apellidos,correo,telefono,direccion,imagen } = req.body;
    
    bcrypt.genSalt(10,function(err,salt){  
        bcrypt.hash(req.body.contraseña,salt,function(err,hash){ 
    const sql = `UPDATE usuario SET 
                nombres = '${nombres}', 
                apellidos = '${apellidos}', 
                correo = '${correo}', 
                contraseña = '${hash}', 
                telefono = '${telefono}', 
                direccion = '${direccion}', 
                imagen = '${imagen}'
                WHERE idusuario =${idusuario}`;
  
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Usuario '+nombres+' '+apellidos+' Actualizado!');
    });
    });
  });
});
  
  //CRUD PRODUCTOS
  
  app.get('/productos', (req, res) => {
    const sql = 'SELECT * FROM producto';
  
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send('No se encontraron resultados! Inténtelo nuevamente');
      }
    });
  });
  
  app.get('/producto/:idproducto', (req, res) => {
    const { idproducto } = req.params;
    const sql = `SELECT * FROM producto WHERE idproducto = ${idproducto}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
  
      if (result.length > 0) {
        res.json(result);
      } else {
        res.send('No se encontraron resultados! Inténtelo nuevamente');
      }
    });
  });
  
  app.post('/productos', (req, res) => {
    const sql = 'INSERT INTO producto SET ?';
  
    const productObj = {
      idproducto: req.body.idproducto,
      nombre: req.body.nombre,
      precio:req.body.precio,
      estado:req.body.estado,
      fecha_creacion: moment().format('YYYY-MM-DD hh:mm:ss'),
      usuario_idusuario_vendedor:req.body.usuario_idusuario_vendedor,
      categoria_idcategoria:req.body.categoria_idcategoria,
      talla_idtalla:req.body.talla_idtalla,
      marca_idmarca:req.body.marca_idmarca
    };
  
    connection.query(sql, productObj, error => {
      if (error) throw error;
      res.send('Producto '+req.body.nombre+' Creado!');
    });
  });
  
  app.put('/producto/:idproducto', (req, res) => {
    const { idproducto} = req.params;
    const { nombre, precio, estado,usuario_idusuario_vendedor,categoria_idcategoria,talla_idtalla,marca_idmarca  } = req.body;
    const sql = `UPDATE producto SET 
                nombre = '${nombre}', 
                precio =${precio},
                estado ='${estado}',
                usuario_idusuario_vendedor =${usuario_idusuario_vendedor},
                categoria_idcategoria = ${categoria_idcategoria},
                talla_idtalla = ${talla_idtalla},
                marca_idmarca = ${marca_idmarca}
                WHERE idproducto = ${idproducto};`;
  
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Producto '+nombre+' Actualizado!');
    });
  });

  app.delete('/producto/:idproducto', (req, res) => {
    const { idproducto } = req.params;
    const sql = `DELETE FROM producto WHERE idproducto= ${idproducto}`;
  
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Producto '+idproducto+' Eliminado!');
    });
  });
   //CRUD COMPRAS
  
   app.get('/compras', (req, res) => {
    const sql = 'SELECT * FROM compra';
  
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send('No se encontraron resultados! Inténtelo nuevamente');
      }
    });
  });
  
  app.get('/compra/:idcompra', (req, res) => {
    const { idcompra } = req.params;
    const sql = `SELECT * FROM compra WHERE idcompra = ${idcompra}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
  
      if (result.length > 0) {
        res.json(result);
      } else {
        res.send('No se encontraron resultados! Inténtelo nuevamente');res.send('Not result');
      }
    });
  });
  
  app.post('/compras', (req, res) => {
    const sql = 'INSERT INTO compra SET ?';
  
    const compraObj = {
      idcompra: req.body.idcompra,
      fecha_compra: moment().format('YYYY-MM-DD hh:mm:ss'),
      monto:req.body.monto,
      estado:req.body.estado,
      usuario_idusuario_vendedor:req.body.usuario_idusuario_vendedor,
      usuario_idusuario_comprador:req.body.usuario_idusuario_comprador,
      producto_idproducto:req.body.producto_idproducto
    };
  
    connection.query(sql, compraObj, error => {
      if (error) throw error;
      res.send('Compra con monto'+req.body.monto+' Realizada!');
    });
  });
  
  app.put('/compra/:idcompra', (req, res) => {
    const { idcompra} = req.params;
    const { monto,estado,usuario_idusuario_vendedor,usuario_idusuario_comprador,producto_idproducto } = req.body;
    const sql = `UPDATE compra SET 
                monto = '${monto}', 
                estado ='${estado}',
                usuario_idusuario_comprador ='${usuario_idusuario_comprador}',
                usuario_idusuario_vendedor ='${usuario_idusuario_vendedor}',
                producto_idproducto ='${producto_idproducto}',
                WHERE idcompra =${idcompra}`;
                connection.query(sql, error => {
                    if (error) throw error;
                    res.send('Compra con monto'+monto+' Actualizada!');
                  });
                });
                
    
    //PREPARED STATEMENT
    //-- Detalles de Todas las Compras ----
    app.get('/detalle-compras', (req, res) => {
        const sql = 'SELECT producto.idproducto AS "ID_PRODUCTO", '+ 
        'producto.nombre AS "PRENDA ", '+
        'producto.estado AS "ESTADO PRENDA",  '+
        'compra.fecha_compra AS "FECHA DE COMPRA",  '+
        'compra.monto AS "MONTO DE COMPRA",   '+
        'compra.estado AS "ESTADO DE COMRPRA"  '+
        'FROM producto JOIN compra on producto.idproducto = compra.producto_idproducto;';
        
        connection.query(sql, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
            res.json(results);
            } else {
            res.send('No se encontraron resultados! Inténtelo nuevamente');
            }
        });
        });
    
    //-- Consulta Ventas realizadas por Usuario --
    app.get('/ventas-por-usuario', (req, res) => {
        const sql = 
        'SELECT '+ 
            'usuario.nombres AS "VENDEDOR - NOMBRE", '+ 
            'usuario.apellidos AS "APELLIDOS", '+ 
            'usuario.correo AS "CORREO", '+ 
            'producto.nombre AS "PRENDA",  '+ 
            'producto.estado AS "ESTADO PRENDA", '+ 
            'compra.fecha_compra AS "FECHA DE COMPRA", '+ 
            'compra.monto AS "MONTO DE VENTA",  '+ 
            'compra.estado AS "ESTADO DE VENTA" '+ 
        'FROM compra '+ 
        'JOIN producto '+ 
        'ON producto.idproducto = compra.producto_idproducto '+ 
        'JOIN usuario '+ 
        'ON usuario.idusuario = compra.usuario_idusuario_vendedor ';
        
        connection.query(sql, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
            res.json(results);
            } else {
            res.send('No se encontraron resultados! Inténtelo nuevamente');
            }
        });
        });
    
    //-- Consulta Compras Realizadas  por Usuario--
    app.get('/compras-por-usuario', (req, res) => {
        const sql = 
        'SELECT '+
            'usuario.nombres AS "COMPRADOR - NOMBRE", '+
            'usuario.apellidos AS "APELLIDOS", '+
            'usuario.correo AS "CORREO", '+
            'producto.nombre AS "PRENDA", '+
            'producto.estado AS "ESTADO PRENDA",'+
            'compra.fecha_compra AS "FECHA DE COMPRA",'+
            'compra.monto AS "MONTO DE COMPRA", '+
            'compra.estado AS "ESTADO DE COMRPRA"'+
        'FROM compra '+
        'JOIN producto '+
        'ON producto.idproducto = compra.producto_idproducto '+
        'JOIN usuario '+
        'ON usuario.idusuario = compra.usuario_idusuario_comprador ';
        
        connection.query(sql, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
            res.json(results);
            } else {
            res.send('No se encontraron resultados! Inténtelo nuevamente');
            }
        });
        });

    
    

  // Check connect
  connection.connect(error => {
    if (error) throw error;
    console.log('Database MYSQL server running!');
  });
  
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));