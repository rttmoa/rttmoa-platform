export interface MongoUser {
  _id?: string | object;
  username?: string;
  services: {
    password?: {
      bcrypt: string;
    };
  };
  emails?: [
    {
      address: string;
      verified: boolean;
    }
  ];
  [key: string]: any;
}


export interface AccountsMongoOptions {
  collectionName?: string
  sessionCollectionName?: string
  timestamps?: {
    createdAt: string
    updatedAt: string
  }
  convertUserIdToMongoObjectId?: boolean
  convertSessionIdToMongoObjectId?: boolean
  caseSensitiveUserName?: boolean
  idProvider?: () => string | object
  dateProvider?: (date?: Date) => any
}

/** #### TODO: 连接信息  */
export interface ConnectionInformations {
  ip?: string
  userAgent?: string
  space?: string
  is_phone?: boolean
  is_tablet?: boolean
  logout_other_clients?: boolean
  login_expiration_in_days?: number
  phone_logout_other_clients?: boolean
  phone_login_expiration_in_days?: number
  provider?: string
  jwtToken?: string
}


export interface CreateUser {
  username?: string
  email?: string
  [additionalKey: string]: any
}


export interface Session {
  id: string
  userId: string
  token: string
  valid: boolean
  userAgent?: string
  ip?: string
  createdAt: string
  updatedAt: string
}


interface EmailRecord {
  address: string
  verified: boolean
}
export interface User {
  username?: string
  emails?: EmailRecord[]
  email: string
  email_verified: boolean
  mobile: string
  mobile_verified: boolean
  name: string
  id: string
  services?: object
  deactivated: boolean
}




interface DatabaseInterfaceSessions {
  findSessionById(sessionId: string): Promise<Session | null>;
  findSessionByToken(token: string): Promise<Session | null>;
  findValidSessionsByUserId(
    userId: string,
    is_phone: boolean
  ): Promise<Array<Session> | null>;
  createSession(
    userId: string,
    token: string,
    connection: ConnectionInformations,
    extraData?: object
  ): Promise<string>;
  updateSession(sessionId: string, connection: ConnectionInformations): Promise<void>;
  invalidateSession(sessionId: string): Promise<void>;
  invalidateAllSessions(userId: string): Promise<void>;
}
export interface DatabaseInterface extends DatabaseInterfaceSessions {
  findUserByEmail(email: string): Promise<User | null>
  findUserByUsername(username: string): Promise<User | null>
  findUserById(userId: string): Promise<User | null>
  findUserByMobile(mobile: string): Promise<User | null>

  createUser(user: CreateUser): Promise<string>
  setUsername(userId: string, newUsername: string): Promise<void>

  findUserByServiceId(serviceName: string, serviceId: string): Promise<User | null>
  setService(userId: string, serviceName: string, data: object): Promise<void>
  unsetService(userId: string, serviceName: string): Promise<void>

  findPasswordHash(userId: string): Promise<string | null>
  findUserByResetPasswordToken(token: string): Promise<User | null>
  setPassword(userId: string, newPassword: string): Promise<void>
  addResetPasswordToken(
    userId: string,
    email: string,
    token: string,
    reason: string
  ): Promise<void>
  setResetPassword(
    userId: string,
    email: string,
    newPassword: string,
    token: string
  ): Promise<void>

  findUserByEmailVerificationToken(token: string): Promise<User | null>
  addEmail(userId: string, newEmail: string, verified: boolean): Promise<void>
  removeEmail(userId: string, email: string): Promise<void>
  verifyEmail(userId: string, email: string): Promise<void>
  verifyMobile(userId: string, email: string): Promise<void>
  addEmailVerificationToken(
    userId: string,
    email: string,
    token: string,
    code: string
  ): Promise<void>
  setUserDeactivated(userId: string, deactivated: boolean): Promise<void>;
  
  addVerificationCode(user: any, code: string, options: any): Promise<void>;

  findUserByVerificationCode(user: any, code: string): Promise<User | null>;
  
  checkVerificationCode(user: any, code: string): Promise<boolean>;

  getMySpaces(userId: string): Promise<any | null>;

  getInviteInfo(id: string): Promise<any | null>;
  
  setEmail(userId: string, newEmail: string): Promise<void>;
  setMobile(userId: string, newMobile: string): Promise<void>;
  updateUser(userId: string, options: any): Promise<any>;
} 