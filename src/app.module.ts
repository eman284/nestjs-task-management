import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { configValidationSchema } from "./auth/config.schema";
import { TasksModule } from "./tasks/tasks.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: [`environments/.env.${process.env.STAGE}`],
    validationSchema: configValidationSchema
  }), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const isProduction = configService.get("STAGE") === "prod";

      return {
        // secure connection
        ssl: isProduction,
        //
        url: isProduction ? configService.get("DB_URL") : null,
        extra: {
          ssl: isProduction ? { rejectUnauthorized: false } : null
        },
        type: "postgres",
        entities: ["**/*.entity{ .ts,.js}"],
        autoLoadEntities: true,
        synchronize: true,
        host: configService.get("DB_HOST"),
        port: configService.get("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_DATABASE")
      };

    }
  })
    , TasksModule, AuthModule, UserModule],
  controllers: [],
  providers: []
})
export class AppModule {
}
