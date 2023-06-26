import { Request, Response } from 'express';
import { configs } from '../../../../utils/configs/envConfigs';

// Callback handler function for successful authentication
const handleSuccessfulAuth = (req: Request, res: Response) => {
  console.log(req.user);
  const cookieOptions = {
    secure: configs.env === 'production',
    httpOnly: true,
  };

  // res.cookie('email', req.user.refreshToken, cookieOptions);

  res.redirect('http://localhost:3000');
};

export const GoogleControllers = {
  handleSuccessfulAuth,
};
