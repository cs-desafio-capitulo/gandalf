import setupApp from './src/app';
import env from './src/config/env';

const port = env.app.port || 3000;

setupApp().then(app => app.listen(port, () => {
  console.log(`app running on port ${port}`);
}))
  .catch((err) => {
    console.log(err);
  });
