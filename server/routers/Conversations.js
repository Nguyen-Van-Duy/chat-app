import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    res.json({
        status: 200,
        message: 'Sucsess'
    })
})

export default router;