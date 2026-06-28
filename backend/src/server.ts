import app from './app';
import { appConfig } from './app/config';

app.listen(appConfig.port, () => {
  console.log(
    `🚀 ${appConfig.appName} API is running on port ${appConfig.port} (${appConfig.environment})`,
  );
});
