import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function getDatabaseType(dbType: string | undefined): TypeOrmModuleOptions['type'] {
  const validTypes: TypeOrmModuleOptions['type'][] = [
    'mysql', 'mariadb', 'postgres', 'cockroachdb', 'sqlite',
    'mssql', 'sap', 'oracle', 'cordova', 'nativescript',
    'react-native', 'sqljs', 'mongodb', 'aurora-mysql',
    'expo', 'better-sqlite3', 'capacitor', 'spanner',
  ];
  return validTypes.includes(dbType as any) ? dbType as TypeOrmModuleOptions['type'] : 'mysql';
}