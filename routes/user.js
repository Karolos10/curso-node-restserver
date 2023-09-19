

const { Router } = require('express');
const { check } = require('express-validator');


const { validarcampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { userGet, userPost, userPut, userDelete, userPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', userGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom( esRoleValido ),
    validarcampos
],userPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe de ser mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo electronico ingresado no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    //check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( esRoleValido ),
    validarcampos
], userPost);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarcampos
], userDelete);

router.patch('/', userPatch);


module.exports = router;