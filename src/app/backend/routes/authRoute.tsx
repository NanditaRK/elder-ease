// backend/routes/authRoutes.ts
import express, { Request, Response } from 'express';
import passport from 'passport';

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: true,
  }),
  (req: Request, res: Response) => {
    res.redirect('/');
  }
);

router.get('/logout', (req: Request, res: Response) => {
  req.logout();
  res.redirect('/');
});

router.get('/user', (req: Request, res: Response) => {
  res.send(req.user);
});

export default router;
