import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  ValidatePassword: { input: any; output: any; }
};

export type ActualizarConceptoDto = {
  editable?: InputMaybe<Scalars['Boolean']['input']>;
  esSuma?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  nombre?: InputMaybe<Scalars['String']['input']>;
  valores?: InputMaybe<Scalars['String']['input']>;
};

export type AddAndRemoveRoleInput = {
  roleId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type AddReferenciaToProyectoInput = {
  marcaId: Scalars['String']['input'];
  observacion?: InputMaybe<Scalars['String']['input']>;
  proyectoId?: InputMaybe<Scalars['String']['input']>;
  referenciaId: Scalars['String']['input'];
  tipoProyectoId: Scalars['String']['input'];
  valor: Scalars['Float']['input'];
};

export type ApprovalTokenInput = {
  code: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
  user: User;
};

export type City = {
  __typename?: 'City';
  code: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  department?: Maybe<Department>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Client = {
  __typename?: 'Client';
  address?: Maybe<Scalars['String']['output']>;
  celular: Scalars['String']['output'];
  city?: Maybe<City>;
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  department?: Maybe<Department>;
  descripcion?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  numberDocument: Scalars['String']['output'];
  telefono?: Maybe<Scalars['String']['output']>;
  type?: Maybe<TypeClientEnum>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  vertical?: Maybe<Scalars['String']['output']>;
};

export type ClientContact = {
  __typename?: 'ClientContact';
  celular: Scalars['String']['output'];
  client?: Maybe<Client>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  position: Scalars['String']['output'];
  telefono?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ClientContactModel = {
  __typename?: 'ClientContactModel';
  client: Client;
  contact: Array<ClientContact>;
};

export type CodeConfirmationInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type CodeRecoverPasswordInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type ConceptoTable = {
  __typename?: 'ConceptoTable';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  editable?: Maybe<Scalars['Boolean']['output']>;
  esSuma: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  nombre: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  valores: Scalars['String']['output'];
};

export type Cotizacion = {
  __typename?: 'Cotizacion';
  ciudadCliente: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  descripcion?: Maybe<Scalars['String']['output']>;
  detalle?: Maybe<Array<DetalleCotizacion>>;
  emailCliente: Scalars['String']['output'];
  fecha: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  nitCliente: Scalars['String']['output'];
  nombreCliente: Scalars['String']['output'];
  nombreVendedor: Scalars['String']['output'];
  numeroCotizacion: Scalars['String']['output'];
  proyecto?: Maybe<Proyectos>;
  status?: Maybe<CotizacionStatusEnum>;
  updatedAt: Scalars['DateTime']['output'];
  valor: Scalars['Float']['output'];
  vendedor: Scalars['String']['output'];
};

export type CotizacionSeachInput = {
  ano: Scalars['Float']['input'];
  mes: Scalars['Float']['input'];
};

export enum CotizacionStatusEnum {
  Aceptada = 'ACEPTADA',
  Ganada = 'GANADA',
  Perdida = 'PERDIDA',
  Revisada = 'REVISADA'
}

export type Country = {
  __typename?: 'Country';
  code: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CrearConceptoDto = {
  editable?: InputMaybe<Scalars['Boolean']['input']>;
  esSuma: Scalars['Boolean']['input'];
  nombre: Scalars['String']['input'];
  valores: Scalars['String']['input'];
};

export type CreateAndRemoveRoleFxInput = {
  permissions: Array<Scalars['String']['input']>;
  role: Scalars['ID']['input'];
};

export type CreateClientContactInput = {
  celular: Scalars['String']['input'];
  clientId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  position: Scalars['String']['input'];
  telefono?: InputMaybe<Scalars['String']['input']>;
};

export type CreateClientInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  celular: Scalars['String']['input'];
  cityId?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  numberDocument: Scalars['String']['input'];
  telefono?: InputMaybe<Scalars['String']['input']>;
  type: TypeClientEnum;
  userId?: InputMaybe<Scalars['String']['input']>;
  vertical?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCotizacionInput = {
  ciudadCliente: Scalars['String']['input'];
  emailCliente: Scalars['String']['input'];
  fecha: Scalars['DateTime']['input'];
  nitCliente: Scalars['String']['input'];
  nombreCliente: Scalars['String']['input'];
  nombreVendedor: Scalars['String']['input'];
  numeroCotizacion: Scalars['String']['input'];
  valor: Scalars['Float']['input'];
  vendedor: Scalars['String']['input'];
};

export type CreateDocumentTypeInput = {
  document: Scalars['String']['input'];
};

export type CreateDummyInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstField: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  secondField: Scalars['DateTime']['input'];
  thirdField: Scalars['Float']['input'];
};

export type CreateFletesInput = {
  backComision: Scalars['Float']['input'];
  carrier: Scalars['String']['input'];
  carrierCell: Scalars['String']['input'];
  contactClient: Scalars['String']['input'];
  description: Scalars['String']['input'];
  numberDocument: Scalars['String']['input'];
  numberGuia: Scalars['String']['input'];
  oip: Scalars['Float']['input'];
  valueFlete: Scalars['Float']['input'];
};

export type CreateGroupInput = {
  name: Scalars['String']['input'];
  notificationConfigId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateMarcaInput = {
  nombre: Scalars['String']['input'];
};

export type CreateMultikeyRegisterInput = {
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  id: MultikeyRegisterIdInput;
};

export type CreateNotificationConfigInput = {
  emailDuplicateCode?: InputMaybe<Scalars['String']['input']>;
  emailPrincipalCode?: InputMaybe<Scalars['String']['input']>;
  hasEmail?: InputMaybe<Scalars['Boolean']['input']>;
  hasPush?: InputMaybe<Scalars['Boolean']['input']>;
  hasSms?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsEmail?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsPush?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsSms?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsWss?: InputMaybe<Scalars['Boolean']['input']>;
  hasWss?: InputMaybe<Scalars['Boolean']['input']>;
  html?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  profileId: Scalars['ID']['input'];
  smsBody?: InputMaybe<Scalars['String']['input']>;
  subtype: Scalars['String']['input'];
  type: NotificationType;
  wssCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateNotificationGroupInput = {
  groupId?: InputMaybe<Scalars['ID']['input']>;
  metadata: Scalars['String']['input'];
  name: Scalars['String']['input'];
  notificationConfigId: Scalars['ID']['input'];
};

export type CreateNotificationInput = {
  emailRecipients?: InputMaybe<Array<EmailRecipient>>;
  metadata: Scalars['String']['input'];
  notificationGroupId?: InputMaybe<Scalars['ID']['input']>;
  notificationGroupName?: InputMaybe<Scalars['ID']['input']>;
  smsRecipient?: InputMaybe<SmsRecipient>;
  subtypeConfig: Scalars['String']['input'];
  type: TypeNotification;
  typeConfig: NotificationType;
  userId?: InputMaybe<Scalars['ID']['input']>;
  wssRecipient?: InputMaybe<WssRecipient>;
};

export type CreatePageLinkInput = {
  arguments?: InputMaybe<Array<Scalars['String']['input']>>;
  routeType?: InputMaybe<RouterType>;
  target?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CreateParametersInput = {
  codigo: Scalars['String']['input'];
  descripcion: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type: TypeParameterEnum;
  valueDate?: InputMaybe<Scalars['DateTime']['input']>;
  valueFileId?: InputMaybe<Scalars['ID']['input']>;
  valueInt?: InputMaybe<Scalars['Float']['input']>;
  valueString?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePositionInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProfileInput = {
  city: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  document: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  region: Scalars['Int']['input'];
};

export type CreateProyectCommentInput = {
  /** ID del archivo */
  fileId?: InputMaybe<Scalars['String']['input']>;
  /** Saber si viene o no del admin(opcional) */
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Descripción de la tarea (opcional) */
  proyectDescription?: InputMaybe<Scalars['String']['input']>;
  /** ID de la tarea */
  proyectId: Scalars['String']['input'];
};

export type CreateProyectosInput = {
  /** ID del cliente final */
  cityId: Scalars['String']['input'];
  /** ID del cliente final */
  clientFinalId: Scalars['String']['input'];
  /** ID del cliente integrador */
  clientIntegradorId: Scalars['String']['input'];
  /** Fecha de vencimiento del proyecto */
  dateExpiration: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  /** Datos extras */
  metaData: Array<AddReferenciaToProyectoInput>;
  name: Scalars['String']['input'];
  status: ProyectosStatusEnum;
  value: Scalars['Float']['input'];
  /** ID del trabajador asignado a la tarea */
  workerId: Scalars['String']['input'];
};

export type CreateReferenciaInput = {
  codigo: Scalars['String']['input'];
  descripcion: Scalars['String']['input'];
  marcaId: Scalars['String']['input'];
};

export type CreateRoleInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateTaskCommentInput = {
  /** ID del archivo */
  fileId?: InputMaybe<Scalars['String']['input']>;
  /** Saber si viene o no del admin(opcional) */
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Descripción de la tarea (opcional) */
  taskDescription?: InputMaybe<Scalars['String']['input']>;
  /** ID de la tarea */
  taskId: Scalars['String']['input'];
  /** Estado de la tarea */
  taskStatus?: InputMaybe<TaskStatus>;
};

export type CreateTaskInput = {
  /** Saber si viene o no del admin(opcional) */
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Fecha de vencimiento de la tarea */
  taskDateExpiration: Scalars['DateTime']['input'];
  /** Descripción de la tarea (opcional) */
  taskDescription?: InputMaybe<Scalars['String']['input']>;
  /** Nombre de la tarea */
  taskName: Scalars['String']['input'];
  /** Prioridad de la tarea */
  taskPriority: TaskPrioridad;
  /** Estado de la tarea */
  taskStatus: TaskStatus;
  /** ID del trabajador asignado a la tarea */
  workerId: Scalars['String']['input'];
};

export type CreateTipoProyectoInput = {
  descripcion?: InputMaybe<Scalars['String']['input']>;
  nombre: Scalars['String']['input'];
};

export type CreateUserInput = {
  address: Scalars['String']['input'];
  cityId?: InputMaybe<Scalars['ID']['input']>;
  countryId?: InputMaybe<Scalars['ID']['input']>;
  dateIssue?: InputMaybe<Scalars['DateTime']['input']>;
  departmentId?: InputMaybe<Scalars['ID']['input']>;
  email: Scalars['String']['input'];
  hasRural?: InputMaybe<Scalars['Boolean']['input']>;
  identificationNumber: Scalars['String']['input'];
  identificationType: UserDocumentTypes;
  lastName: Scalars['String']['input'];
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
  legalRepresentativeIdentificationType?: InputMaybe<UserDocumentTypes>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['ValidatePassword']['input'];
  phoneCountryCode?: InputMaybe<Scalars['String']['input']>;
  phoneNumber: Scalars['String']['input'];
  position?: InputMaybe<Scalars['String']['input']>;
  secondSurname?: InputMaybe<Scalars['String']['input']>;
  type: UserTypes;
  typeWoker?: InputMaybe<TypeWorker>;
  valueTransport?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateVisitComentInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description: Scalars['String']['input'];
  status?: InputMaybe<VisitComentStatusEnum>;
  type: VisitComentTypeEnum;
  visitId: Scalars['String']['input'];
};

export type CreateVisitInput = {
  clientId: Scalars['String']['input'];
  dateVisit: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  isProyect: Scalars['Boolean']['input'];
  latitude?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  status: StatusVisitEnum;
  typeId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateVisitTypeInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  status: VisitTypeStatusEnum;
};

export type DashboardDataModal = {
  __typename?: 'DashboardDataModal';
  idUser: Scalars['String']['output'];
  label: Scalars['String']['output'];
  total: Scalars['Float']['output'];
};

export type DateFilter = {
  _between?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  _eq?: InputMaybe<Scalars['DateTime']['input']>;
  _gt?: InputMaybe<Scalars['DateTime']['input']>;
  _gte?: InputMaybe<Scalars['DateTime']['input']>;
  _in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  _lt?: InputMaybe<Scalars['DateTime']['input']>;
  _lte?: InputMaybe<Scalars['DateTime']['input']>;
  _neq?: InputMaybe<Scalars['DateTime']['input']>;
  _notbetween?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type Department = {
  __typename?: 'Department';
  code: Scalars['Int']['output'];
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DetalleCotizacion = {
  __typename?: 'DetalleCotizacion';
  cantidad: Scalars['Float']['output'];
  cotizacion: Cotizacion;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  descripcion: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  referencia: Scalars['String']['output'];
  total: Scalars['Float']['output'];
  unidadMedida: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['Float']['output'];
  valorCosto: Scalars['Float']['output'];
  valorVenta: Scalars['Float']['output'];
};

export type DocumentType = {
  __typename?: 'DocumentType';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  document: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DoubleVerificationInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  emailVerification?: InputMaybe<Scalars['Boolean']['input']>;
  phoneVerification?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Dummy = {
  __typename?: 'Dummy';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  firstField: Scalars['String']['output'];
  group?: Maybe<DummyGroup>;
  id: Scalars['ID']['output'];
  items: Array<DummyItem>;
  notification?: Maybe<Notification>;
  phone: Scalars['String']['output'];
  secondField: Scalars['DateTime']['output'];
  thirdField: Scalars['Float']['output'];
  type?: Maybe<DummyType>;
  updatedAt: Scalars['DateTime']['output'];
};

export type DummyFamily = {
  __typename?: 'DummyFamily';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DummyGroup = {
  __typename?: 'DummyGroup';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  family?: Maybe<DummyFamily>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DummyItem = {
  __typename?: 'DummyItem';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  dummy: Dummy;
  firstField: Scalars['String']['output'];
  fourthField: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  secondField: Scalars['DateTime']['output'];
  thirdField: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DummyType = {
  __typename?: 'DummyType';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EmailRecipient = {
  email: Scalars['String']['input'];
  type: RecipientType;
};

export type FacturaPorClienteDto = {
  tem_cedula?: InputMaybe<Scalars['String']['input']>;
  tem_fecha_desde?: InputMaybe<Scalars['String']['input']>;
  tem_fecha_hasta?: InputMaybe<Scalars['String']['input']>;
  tem_nomcli?: InputMaybe<Scalars['String']['input']>;
  tem_numdoc?: InputMaybe<Scalars['String']['input']>;
  tem_vended?: InputMaybe<Scalars['String']['input']>;
};

export type FileInfo = {
  __typename?: 'FileInfo';
  chunkSize?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  fileExtension: Scalars['String']['output'];
  fileMode: FileModes;
  fileMongoId?: Maybe<Scalars['String']['output']>;
  fileName: Scalars['String']['output'];
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export enum FileModes {
  Buffer = 'buffer',
  Mongo = 'mongo',
  Url = 'url'
}

export type FindClientContactOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  numberDocument?: InputMaybe<OrderTypes>;
};

export type FindClientContactWhere = {
  _and?: InputMaybe<Array<FindClientContactWhere>>;
  _or?: InputMaybe<Array<FindClientContactWhere>>;
  client?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  numberDocument?: InputMaybe<StringFilter>;
};

export type FindClientOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  name?: InputMaybe<OrderTypes>;
  numberDocument?: InputMaybe<OrderTypes>;
};

export type FindClientWhere = {
  _and?: InputMaybe<Array<FindClientWhere>>;
  _or?: InputMaybe<Array<FindClientWhere>>;
  city?: InputMaybe<StringFilter>;
  department?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  numberDocument?: InputMaybe<StringFilter>;
  user?: InputMaybe<StringFilter>;
};

export type FindCotizacionOrderBy = {
  fecha?: InputMaybe<OrderTypes>;
};

export type FindCotizacionWhere = {
  _and?: InputMaybe<Array<FindCotizacionWhere>>;
  _or?: InputMaybe<Array<FindCotizacionWhere>>;
  fecha?: InputMaybe<DateFilter>;
  proyecto?: InputMaybe<StringFilter>;
  vendedor?: InputMaybe<StringFilter>;
};

export type FindDummyFamilyWhere = {
  _and?: InputMaybe<Array<FindDummyFamilyWhere>>;
  _or?: InputMaybe<Array<FindDummyFamilyWhere>>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FindDummyGroupWhere = {
  _and?: InputMaybe<Array<FindDummyGroupWhere>>;
  _or?: InputMaybe<Array<FindDummyGroupWhere>>;
  family?: InputMaybe<FindDummyFamilyWhere>;
  name?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FindDummyOrderBy = {
  firstField?: InputMaybe<OrderTypes>;
  secondField?: InputMaybe<OrderTypes>;
  thirdField?: InputMaybe<OrderTypes>;
};

export type FindDummyTypeWhere = {
  _and?: InputMaybe<Array<FindDummyTypeWhere>>;
  _or?: InputMaybe<Array<FindDummyTypeWhere>>;
  name?: InputMaybe<StringFilter>;
};

export type FindDummyWhere = {
  _and?: InputMaybe<Array<FindDummyWhere>>;
  _or?: InputMaybe<Array<FindDummyWhere>>;
  firstField?: InputMaybe<StringFilter>;
  group?: InputMaybe<FindDummyGroupWhere>;
  secondField?: InputMaybe<DateFilter>;
  thirdField?: InputMaybe<NumberFilter>;
  type?: InputMaybe<FindDummyTypeWhere>;
};

export type FindFletesOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindFletesWhere = {
  _and?: InputMaybe<Array<FindFletesWhere>>;
  _or?: InputMaybe<Array<FindFletesWhere>>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
};

export type FindProyectCommentTypeOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindProyectCommentTypeWhere = {
  _and?: InputMaybe<Array<FindProyectCommentTypeWhere>>;
  _or?: InputMaybe<Array<FindProyectCommentTypeWhere>>;
  createdAt?: InputMaybe<DateFilter>;
  createdByUser?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  proyect?: InputMaybe<StringFilter>;
};

export type FindProyectoOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindProyectoWhere = {
  _and?: InputMaybe<Array<FindProyectoWhere>>;
  _or?: InputMaybe<Array<FindProyectoWhere>>;
  createdAt?: InputMaybe<DateFilter>;
  dateExpiration?: InputMaybe<DateFilter>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
  worker?: InputMaybe<StringFilter>;
};

export type FindTaskCommentTypeOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  taskDateExpiration?: InputMaybe<OrderTypes>;
};

export type FindTaskCommentTypeWhere = {
  _and?: InputMaybe<Array<FindTaskCommentTypeWhere>>;
  _or?: InputMaybe<Array<FindTaskCommentTypeWhere>>;
  createdAt?: InputMaybe<DateFilter>;
  description?: InputMaybe<StringFilter>;
  taskDateExpiration?: InputMaybe<DateFilter>;
  taskStatus?: InputMaybe<StringFilter>;
  worker?: InputMaybe<StringFilter>;
};

export type FindTaskTypeOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  taskDateExpiration?: InputMaybe<OrderTypes>;
};

export type FindTaskTypeWhere = {
  _and?: InputMaybe<Array<FindTaskTypeWhere>>;
  _or?: InputMaybe<Array<FindTaskTypeWhere>>;
  createdAt?: InputMaybe<DateFilter>;
  description?: InputMaybe<StringFilter>;
  taskDateExpiration?: InputMaybe<DateFilter>;
  taskStatus?: InputMaybe<StringFilter>;
  worker?: InputMaybe<StringFilter>;
};

export type FindUsersOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  email?: InputMaybe<OrderTypes>;
  name?: InputMaybe<OrderTypes>;
};

export type FindUsersWhere = {
  _and?: InputMaybe<Array<FindUsersWhere>>;
  _or?: InputMaybe<Array<FindUsersWhere>>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  type?: InputMaybe<Array<UserTypes>>;
};

export type FindVisitComentOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  date?: InputMaybe<OrderTypes>;
};

export type FindVisitComentWhere = {
  _and?: InputMaybe<Array<FindVisitComentWhere>>;
  _or?: InputMaybe<Array<FindVisitComentWhere>>;
  date?: InputMaybe<DateFilter>;
  status?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
  user?: InputMaybe<StringFilter>;
  visit?: InputMaybe<StringFilter>;
};

export type FindVisitOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  dateVisit?: InputMaybe<OrderTypes>;
};

export type FindVisitTypeOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindVisitTypeWhere = {
  _and?: InputMaybe<Array<FindVisitTypeWhere>>;
  _or?: InputMaybe<Array<FindVisitTypeWhere>>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
};

export type FindVisitWhere = {
  _and?: InputMaybe<Array<FindVisitWhere>>;
  _or?: InputMaybe<Array<FindVisitWhere>>;
  client?: InputMaybe<StringFilter>;
  dateVisit?: InputMaybe<DateFilter>;
  status?: InputMaybe<StringFilter>;
  user?: InputMaybe<StringFilter>;
};

export type Fletes = {
  __typename?: 'Fletes';
  backComision: Scalars['Float']['output'];
  carrier: Scalars['String']['output'];
  carrierCell: Scalars['String']['output'];
  contactClient: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  numberDocument: Scalars['String']['output'];
  numberGuia: Scalars['String']['output'];
  oip: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  valueFlete: Scalars['Float']['output'];
};

export type FletesWithDocument = {
  __typename?: 'FletesWithDocument';
  CLI_CIUDAD?: Maybe<Scalars['String']['output']>;
  CL_DEPART?: Maybe<Scalars['String']['output']>;
  TEM_CEDULA?: Maybe<Scalars['String']['output']>;
  TEM_FECHA?: Maybe<Scalars['String']['output']>;
  TEM_NOMCLI?: Maybe<Scalars['String']['output']>;
  TEM_NUMDOC?: Maybe<Scalars['String']['output']>;
  TEM_PORCENTAJE_UTILIDAD?: Maybe<Scalars['String']['output']>;
  TEM_PREFIJ?: Maybe<Scalars['String']['output']>;
  TEM_TIPMOV?: Maybe<Scalars['String']['output']>;
  TEM_UTILIDAD?: Maybe<Scalars['String']['output']>;
  TEM_VALCOS?: Maybe<Scalars['String']['output']>;
  TEM_VENDED?: Maybe<Scalars['String']['output']>;
  TEM_VENTA?: Maybe<Scalars['String']['output']>;
  backComision?: Maybe<Scalars['Float']['output']>;
  carrier?: Maybe<Scalars['String']['output']>;
  carrierCell?: Maybe<Scalars['String']['output']>;
  contactClient?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  numberDocument?: Maybe<Scalars['String']['output']>;
  numberGuia?: Maybe<Scalars['String']['output']>;
  oip?: Maybe<Scalars['Float']['output']>;
  valueFlete?: Maybe<Scalars['Float']['output']>;
};

export type FunctionalityModel = {
  __typename?: 'FunctionalityModel';
  children?: Maybe<Array<FunctionalityModel>>;
  description?: Maybe<Scalars['String']['output']>;
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  tags?: Maybe<Array<FunctionalityTag>>;
};

export enum FunctionalityTag {
  Controller = 'CONTROLLER',
  Custom = 'CUSTOM',
  Method = 'METHOD',
  Module = 'MODULE',
  Parent = 'PARENT',
  Resolver = 'RESOLVER',
  Standard = 'STANDARD'
}

export type GetSalesInput = {
  vendedor: Scalars['String']['input'];
};

export type Group = {
  __typename?: 'Group';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  notificationConfig?: Maybe<NotificationConfig>;
  updatedAt: Scalars['DateTime']['output'];
  users?: Maybe<Array<User>>;
};

export type MarcaProyecto = {
  __typename?: 'MarcaProyecto';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  nombre: Scalars['String']['output'];
  referencias: Array<ReferenciaProyecto>;
  updatedAt: Scalars['DateTime']['output'];
};

export type MetadataPagination = {
  __typename?: 'MetadataPagination';
  currentPage?: Maybe<Scalars['Int']['output']>;
  itemsPerPage?: Maybe<Scalars['Int']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type MultikeyRegister = {
  __typename?: 'MultikeyRegister';
  date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: MultikeyRegisterId;
};

export type MultikeyRegisterId = {
  __typename?: 'MultikeyRegisterId';
  id: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type MultikeyRegisterIdInput = {
  id: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptOrDeclineVisit: Scalars['String']['output'];
  addUserRole: User;
  assignSubordinate: User;
  codeConfirmation: User;
  crearConcepto: ConceptoTable;
  create: RoleFx;
  createClient: Client;
  createClientContact: ClientContact;
  createCotizacion: Cotizacion;
  createDefaultRoles: Array<Role>;
  createDocumentType: DocumentType;
  createDummiesX: Array<Dummy>;
  createDummy: Dummy;
  createFletes: Fletes;
  createGroup: Group;
  createMarcaProyecto: MarcaProyecto;
  createMultiKeyRegister: MultikeyRegister;
  createNotification: Notification;
  createNotificationConfig: NotificationConfig;
  createNotificationGroup: NotificationGroup;
  createPageLinkInput: PageLink;
  createParameter: Parameter;
  createPositionInput: Position;
  createProfile: Profile;
  createProyectComment: ProyectComment;
  createProyecto: Proyectos;
  createProyectoReferencia: ProyectoReferencia;
  createReferenciaProyecto: ReferenciaProyecto;
  createRole: Role;
  createRoleFx: Array<RoleFx>;
  createTask: Task;
  createTaskComment: TaskComment;
  createTipoProyecto: TipoProyecto;
  createUser: User;
  createVisit: Visit;
  createVisitComent: VisitComent;
  createVisitType: VisitType;
  eliminarConcepto: Scalars['String']['output'];
  enableAndDisableDoubleVerification: Scalars['String']['output'];
  i18nTest: Scalars['String']['output'];
  recoverPassword: Scalars['String']['output'];
  remove: NotificationGroup;
  removeClient: Client;
  removeClientContact: ClientContact;
  removeCotizacion: Cotizacion;
  removeDocumentType: DocumentType;
  removeDummy: Dummy;
  removeFletes: Fletes;
  removeGroup: Group;
  removeMarcaProyecto: MarcaProyecto;
  removeMultiKeyRegister: MultikeyRegister;
  removeNotification: Notification;
  removeNotificationConfig: NotificationConfig;
  removePageLink: PageLink;
  removeParameter: Parameter;
  removePosition: Position;
  removeProfile: Profile;
  removeProyectComment: ProyectComment;
  removeProyecto: Proyectos;
  removeProyectoReferencia: ProyectoReferencia;
  removeReferenciaProyecto: ReferenciaProyecto;
  removeRole: Role;
  removeRoleFx: Array<Scalars['String']['output']>;
  removeSubordinate: User;
  removeTask: Task;
  removeTaskComment: TaskComment;
  removeTipoProyecto: TipoProyecto;
  removeUser: User;
  removeUserRole: User;
  removeVisit: Visit;
  removeVisitComent: VisitComent;
  removeVisitType: VisitType;
  replaceAllRolesFx: Array<RoleFx>;
  resetPassword: User;
  resetSuperAdmin: User;
  saveDetalleCotizacion: Scalars['Boolean']['output'];
  sendCodeDoubleVerification: Scalars['String']['output'];
  signInAdmin: AuthResponse;
  signUpWithDocument: AuthResponse;
  signUpWithEmail: AuthResponse;
  signin: AuthResponse;
  update: NotificationGroup;
  updateClient: Client;
  updateClientContact: ClientContact;
  updateConcepto: ConceptoTable;
  updateCotizacion: Cotizacion;
  updateDetalleCotizacion: DetalleCotizacion;
  updateDocumentType: DocumentType;
  updateDummy: Dummy;
  updateFletes: Fletes;
  updateGroup: Group;
  updateMarcaProyecto: MarcaProyecto;
  updateMultiKeyRegister: MultikeyRegister;
  updateNotification: Notification;
  updateNotificationConfig: NotificationConfig;
  updatePageLinkInput: PageLink;
  updateParameter: Parameter;
  updatePassword: User;
  updatePositionInput: Position;
  updateProfile: Profile;
  updateProyectComment: ProyectComment;
  updateProyecto: Proyectos;
  updateProyectoReferencia: ProyectoReferencia;
  updateReferenciaProyecto: ReferenciaProyecto;
  updateRole: Role;
  updateTask: Task;
  updateTaskComment: TaskComment;
  updateTipoProyecto: TipoProyecto;
  updateUser: User;
  updateUserInformation: User;
  updateUserPassword: User;
  updateVisit: Visit;
  updateVisitComent: VisitComent;
  updateVisitType: VisitType;
};


export type MutationAcceptOrDeclineVisitArgs = {
  UpdateStatusInput: UpdateStatusInput;
};


export type MutationAddUserRoleArgs = {
  addAndRemoveRoleInput: AddAndRemoveRoleInput;
};


export type MutationAssignSubordinateArgs = {
  managerId: Scalars['String']['input'];
  subordinateId: Scalars['String']['input'];
};


export type MutationCodeConfirmationArgs = {
  createInput: CodeConfirmationInput;
};


export type MutationCrearConceptoArgs = {
  data: CrearConceptoDto;
};


export type MutationCreateArgs = {
  createInput: CreateAndRemoveRoleFxInput;
};


export type MutationCreateClientArgs = {
  createInput: CreateClientInput;
};


export type MutationCreateClientContactArgs = {
  createInput: CreateClientContactInput;
};


export type MutationCreateCotizacionArgs = {
  createInput: CreateCotizacionInput;
};


export type MutationCreateDocumentTypeArgs = {
  createInput: CreateDocumentTypeInput;
};


export type MutationCreateDummyArgs = {
  createInput: CreateDummyInput;
};


export type MutationCreateFletesArgs = {
  createInput: CreateFletesInput;
};


export type MutationCreateGroupArgs = {
  createInput: CreateGroupInput;
};


export type MutationCreateMarcaProyectoArgs = {
  createInput: CreateMarcaInput;
};


export type MutationCreateMultiKeyRegisterArgs = {
  createInput: CreateMultikeyRegisterInput;
};


export type MutationCreateNotificationArgs = {
  createInput: CreateNotificationInput;
};


export type MutationCreateNotificationConfigArgs = {
  createInput: CreateNotificationConfigInput;
};


export type MutationCreateNotificationGroupArgs = {
  createInput: CreateNotificationGroupInput;
};


export type MutationCreatePageLinkInputArgs = {
  createInput: CreatePageLinkInput;
};


export type MutationCreateParameterArgs = {
  createInput: CreateParametersInput;
};


export type MutationCreatePositionInputArgs = {
  createInput: CreatePositionInput;
};


export type MutationCreateProfileArgs = {
  createInput: CreateProfileInput;
};


export type MutationCreateProyectCommentArgs = {
  createInput: CreateProyectCommentInput;
};


export type MutationCreateProyectoArgs = {
  createInput: CreateProyectosInput;
};


export type MutationCreateProyectoReferenciaArgs = {
  createInput: AddReferenciaToProyectoInput;
};


export type MutationCreateReferenciaProyectoArgs = {
  createInput: CreateReferenciaInput;
};


export type MutationCreateRoleArgs = {
  createInput: CreateRoleInput;
};


export type MutationCreateRoleFxArgs = {
  createRoleFxInput: CreateAndRemoveRoleFxInput;
};


export type MutationCreateTaskArgs = {
  createInput: CreateTaskInput;
};


export type MutationCreateTaskCommentArgs = {
  createInput: CreateTaskCommentInput;
};


export type MutationCreateTipoProyectoArgs = {
  createInput: CreateTipoProyectoInput;
};


export type MutationCreateUserArgs = {
  createInput: CreateUserInput;
};


export type MutationCreateVisitArgs = {
  createInput: CreateVisitInput;
};


export type MutationCreateVisitComentArgs = {
  createInput: CreateVisitComentInput;
};


export type MutationCreateVisitTypeArgs = {
  createInput: CreateVisitTypeInput;
};


export type MutationEliminarConceptoArgs = {
  eliminarConceptoDto: Scalars['String']['input'];
};


export type MutationEnableAndDisableDoubleVerificationArgs = {
  doubleVerificationInput: DoubleVerificationInput;
};


export type MutationRecoverPasswordArgs = {
  recoverPasswordInput: RecoverPasswordInput;
};


export type MutationRemoveArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveClientArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveClientContactArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCotizacionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveDocumentTypeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveDummyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveFletesArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveGroupArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveMarcaProyectoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveMultiKeyRegisterArgs = {
  id: MultikeyRegisterIdInput;
};


export type MutationRemoveNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveNotificationConfigArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemovePageLinkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveParameterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemovePositionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveProfileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveProyectCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveProyectoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveProyectoReferenciaArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveReferenciaProyectoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveRoleFxArgs = {
  removeRoleFxInput: CreateAndRemoveRoleFxInput;
};


export type MutationRemoveSubordinateArgs = {
  managerId: Scalars['String']['input'];
  subordinateId: Scalars['String']['input'];
};


export type MutationRemoveTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTaskCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTipoProyectoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserRoleArgs = {
  addAndRemoveRoleInput: AddAndRemoveRoleInput;
};


export type MutationRemoveVisitArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveVisitComentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveVisitTypeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationReplaceAllRolesFxArgs = {
  replaceAllRoleFxInput: CreateAndRemoveRoleFxInput;
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
};


export type MutationSaveDetalleCotizacionArgs = {
  id: Scalars['String']['input'];
};


export type MutationSendCodeDoubleVerificationArgs = {
  sendDoubleVerificationInput: SendDoubleVerificationInput;
};


export type MutationSignInAdminArgs = {
  signInAdminInput: SigninAdminInput;
};


export type MutationSignUpWithDocumentArgs = {
  signupInput: SignupInput;
};


export type MutationSignUpWithEmailArgs = {
  signupInput: SignupEmailInput;
};


export type MutationSigninArgs = {
  signinInput: SigninInput;
};


export type MutationUpdateArgs = {
  updateInput: UpdateNotificationGroupInput;
};


export type MutationUpdateClientArgs = {
  updateInput: UpdateClientInput;
};


export type MutationUpdateClientContactArgs = {
  updateInput: UpdateClientContactInput;
};


export type MutationUpdateConceptoArgs = {
  actualizarConceptoDto: ActualizarConceptoDto;
};


export type MutationUpdateCotizacionArgs = {
  updateInput: UpdateCotizacionInput;
};


export type MutationUpdateDetalleCotizacionArgs = {
  updateInput: UpdateCotizacionDetalleInput;
};


export type MutationUpdateDocumentTypeArgs = {
  updateInput: UpdateDocumentTypeInput;
};


export type MutationUpdateDummyArgs = {
  updateInput: UpdateDummyInput;
};


export type MutationUpdateFletesArgs = {
  updateInput: UpdateFletesInput;
};


export type MutationUpdateGroupArgs = {
  updateInput: UpdateGroupInput;
};


export type MutationUpdateMarcaProyectoArgs = {
  updateInput: UpdateMarcaInput;
};


export type MutationUpdateMultiKeyRegisterArgs = {
  updateInput: UpdateMultikeyRegisterInput;
};


export type MutationUpdateNotificationArgs = {
  updateInput: UpdateNotificationInput;
};


export type MutationUpdateNotificationConfigArgs = {
  updateInput: UpdateNotificationConfigInput;
};


export type MutationUpdatePageLinkInputArgs = {
  updateInput: CreatePageLinkInput;
};


export type MutationUpdateParameterArgs = {
  updateInput: UpdateParametersInput;
};


export type MutationUpdatePasswordArgs = {
  updatePasswordInput: UpdatePasswordInput;
};


export type MutationUpdatePositionInputArgs = {
  updateInput: UpdatePositionInput;
};


export type MutationUpdateProfileArgs = {
  updateInput: UpdateProfileInput;
};


export type MutationUpdateProyectCommentArgs = {
  updateInput: UpdateProyectCoomentInput;
};


export type MutationUpdateProyectoArgs = {
  updateInput: UpdatePryectosInput;
};


export type MutationUpdateProyectoReferenciaArgs = {
  updateInput: UpdateProyectoReferenciaInput;
};


export type MutationUpdateReferenciaProyectoArgs = {
  updateInput: UpdateReferenciaInput;
};


export type MutationUpdateRoleArgs = {
  updateInput: UpdateRoleInput;
};


export type MutationUpdateTaskArgs = {
  updateInput: UpdateTaskInput;
};


export type MutationUpdateTaskCommentArgs = {
  updateInput: UpdateTaskCoomentInput;
};


export type MutationUpdateTipoProyectoArgs = {
  updateInput: UpdateTipoProyectoInput;
};


export type MutationUpdateUserArgs = {
  updateInput: UpdateUserInput;
};


export type MutationUpdateUserInformationArgs = {
  updateUserInformationInput: UpdateUserInformationInput;
};


export type MutationUpdateUserPasswordArgs = {
  updateUserPasswordInput: UpdateUserPasswordInput;
};


export type MutationUpdateVisitArgs = {
  updateInput: UpdateVisitInput;
};


export type MutationUpdateVisitComentArgs = {
  updateInput: UpdateVisitComentInput;
};


export type MutationUpdateVisitTypeArgs = {
  updateInput: UpdateVisitTypeInput;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  externalId?: Maybe<Scalars['ID']['output']>;
  externalMessage?: Maybe<Scalars['String']['output']>;
  hasPersistent: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['String']['output']>;
  notificationConfig: NotificationConfig;
  notificationGroup?: Maybe<NotificationGroup>;
  persistentExpiration?: Maybe<Scalars['DateTime']['output']>;
  stateNotification: StateNotification;
  statePersistent?: Maybe<StatePersistent>;
  type: TypeNotification;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type NotificationConfig = {
  __typename?: 'NotificationConfig';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  emailDuplicateCode?: Maybe<Scalars['ID']['output']>;
  emailPrincipalCode?: Maybe<Scalars['ID']['output']>;
  hasEmail: Scalars['Boolean']['output'];
  hasPersistent: Scalars['Boolean']['output'];
  hasPush: Scalars['Boolean']['output'];
  hasSms: Scalars['Boolean']['output'];
  hasTwoStepsEmail: Scalars['Boolean']['output'];
  hasTwoStepsPush: Scalars['Boolean']['output'];
  hasTwoStepsSms: Scalars['Boolean']['output'];
  hasTwoStepsWss: Scalars['Boolean']['output'];
  hasWss: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  persistentExpiration?: Maybe<Scalars['DateTime']['output']>;
  persistentHtml?: Maybe<Scalars['String']['output']>;
  profile: Profile;
  smsBody?: Maybe<Scalars['String']['output']>;
  subtype: Scalars['String']['output'];
  type: NotificationType;
  updatedAt: Scalars['DateTime']['output'];
  wssCode?: Maybe<Scalars['ID']['output']>;
};

export type NotificationGroup = {
  __typename?: 'NotificationGroup';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  group: Group;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  notificationConfig: NotificationConfig;
  stateNotificationGroup: StateNotificationGroup;
  typeNotificationGroup: TypeNotificationGroup;
  updatedAt: Scalars['DateTime']['output'];
};

export enum NotificationType {
  Token = 'Token'
}

export type NumberFilter = {
  _between?: InputMaybe<Array<Scalars['Float']['input']>>;
  _eq?: InputMaybe<Scalars['Float']['input']>;
  _gt?: InputMaybe<Scalars['Float']['input']>;
  _gte?: InputMaybe<Scalars['Float']['input']>;
  _in?: InputMaybe<Array<Scalars['Float']['input']>>;
  _lt?: InputMaybe<Scalars['Float']['input']>;
  _lte?: InputMaybe<Scalars['Float']['input']>;
  _neq?: InputMaybe<Scalars['Float']['input']>;
  _notbetween?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export enum OrderTypes {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageLink = {
  __typename?: 'PageLink';
  arguments?: Maybe<Array<Scalars['String']['output']>>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  routeType?: Maybe<RouterType>;
  target?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type Pagination = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type Parameter = {
  __typename?: 'Parameter';
  codigo: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  descripcion: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: TypeParameterEnum;
  updatedAt: Scalars['DateTime']['output'];
  valueDate?: Maybe<Scalars['DateTime']['output']>;
  valueFile?: Maybe<FileInfo>;
  valueInt?: Maybe<Scalars['Float']['output']>;
  valueString?: Maybe<Scalars['String']['output']>;
};

export enum PersonTypes {
  Legal = 'Legal',
  Natural = 'Natural'
}

export type Position = {
  __typename?: 'Position';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Profile = {
  __typename?: 'Profile';
  city: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  document: Scalars['String']['output'];
  email: Scalars['String']['output'];
  externalId: Scalars['ID']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  region: Scalars['Int']['output'];
  stateAws?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type ProyectComment = {
  __typename?: 'ProyectComment';
  createdAt: Scalars['DateTime']['output'];
  createdByUser: User;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  file?: Maybe<FileInfo>;
  id: Scalars['ID']['output'];
  proyect: Proyectos;
  proyectDescription?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProyectoEmbudoDto = {
  __typename?: 'ProyectoEmbudoDto';
  cantidad: Scalars['Float']['output'];
  estado: ProyectosStatusEnum;
  userId: Scalars['ID']['output'];
  valorTotal: Scalars['Float']['output'];
};

export type ProyectoReferencia = {
  __typename?: 'ProyectoReferencia';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  marca: MarcaProyecto;
  observacion?: Maybe<Scalars['String']['output']>;
  proyecto?: Maybe<Proyectos>;
  referencia: ReferenciaProyecto;
  tipoProyecto: TipoProyecto;
  updatedAt: Scalars['DateTime']['output'];
  valor: Scalars['Float']['output'];
};

export type Proyectos = {
  __typename?: 'Proyectos';
  city?: Maybe<City>;
  clientFinal: Client;
  clientIntegrador: Client;
  createdAt: Scalars['DateTime']['output'];
  createdByUser: User;
  dateExpiration: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  referencias?: Maybe<Array<ProyectoReferencia>>;
  status: ProyectosStatusEnum;
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['Float']['output'];
  worker: User;
};

export enum ProyectosStatusEnum {
  Exploracion = 'EXPLORACION',
  GanadoCerrado = 'GANADO_CERRADO',
  Negociacion = 'NEGOCIACION',
  PerdidoCerrado = 'PERDIDO_CERRADO',
  Presentacion = 'PRESENTACION',
  Propuesta = 'PROPUESTA'
}

export type Query = {
  __typename?: 'Query';
  Count: MetadataPagination;
  Fletes: Fletes;
  Fletess: Array<Fletes>;
  FletessCount: MetadataPagination;
  NotificationGroup: NotificationGroup;
  NotificationGroups: Array<NotificationGroup>;
  NotificationGroupsCount: MetadataPagination;
  ProyectoReferencias: Array<ProyectoReferencia>;
  ProyectoReferenciasCount: MetadataPagination;
  approvalJwt: AuthResponse;
  cities: Array<City>;
  city: City;
  client: Client;
  clientAndContact: ClientContactModel;
  clientContact: ClientContact;
  clientContacts: Array<ClientContact>;
  clientContactsCount: MetadataPagination;
  clients: Array<Client>;
  clientsCount: MetadataPagination;
  codeRecoverPassword: Scalars['String']['output'];
  cotizacion: Cotizacion;
  cotizaciones: Array<Cotizacion>;
  cotizacionesCount: MetadataPagination;
  countries: Array<Country>;
  country: Country;
  department: Department;
  departments: Array<Department>;
  documentType: DocumentType;
  documentTypes: Array<DocumentType>;
  documentTypesCount: MetadataPagination;
  dummies: Array<Dummy>;
  dummiesCount: MetadataPagination;
  dummy: Dummy;
  file: FileInfo;
  findAll: Array<UserKey>;
  findAllFacturaCliente: Array<FletesWithDocument>;
  findAllVisitDashboard: VisitDashboardModel;
  findOne: UserKey;
  findOneFacturaClienteByCode: FindOneFacturaClienteByCode;
  findSeachCotizacion: Scalars['Boolean']['output'];
  findStatisticStatusProyect: Array<ProyectoEmbudoDto>;
  findUtilidadReal: UtilidadRealModel;
  functionalities: FunctionalityModel;
  getDataDashboard: Array<DashboardDataModal>;
  group: Group;
  groups: Array<Group>;
  groupsCount: MetadataPagination;
  marcaProyecto: MarcaProyecto;
  marcaProyectos: Array<MarcaProyecto>;
  marcaProyectosCount: MetadataPagination;
  multiKeyRegister: MultikeyRegister;
  multiKeyRegisters: Array<MultikeyRegister>;
  multiKeyRegistersCount: MetadataPagination;
  notification: Notification;
  notificationConfig: NotificationConfig;
  notificationConfigs: Array<NotificationConfig>;
  notificationConfigsCount: MetadataPagination;
  notifications: Array<Notification>;
  notificationsCount: MetadataPagination;
  pageLink: PageLink;
  pageLinks: Array<PageLink>;
  pageLinksCount: MetadataPagination;
  parameter: Parameter;
  parameters: Array<Parameter>;
  parametersCount: MetadataPagination;
  position: Position;
  positions: Array<Position>;
  positionsCount: MetadataPagination;
  profile: Profile;
  profiles: Array<Profile>;
  profilesCount: MetadataPagination;
  proyectComment: ProyectComment;
  proyectComments: Array<ProyectComment>;
  proyectCommentsCount: MetadataPagination;
  proyecto: Proyectos;
  proyectoReferencia: ProyectoReferencia;
  proyectos: Array<Proyectos>;
  proyectosCount: MetadataPagination;
  referenciaProyecto: ReferenciaProyecto;
  referenciaProyectos: Array<ReferenciaProyecto>;
  referenciaProyectosCount: MetadataPagination;
  revalidate: AuthResponse;
  role: Role;
  roleFx: RoleFx;
  roles: Array<Role>;
  rolesCount: MetadataPagination;
  rolesFx: Array<RoleFx>;
  rolesFxCount: MetadataPagination;
  sendEmailRecovryPassword: Scalars['String']['output'];
  task: Task;
  taskComment: TaskComment;
  tasks: Array<Task>;
  tasksComments: Array<TaskComment>;
  tasksCommentsCount: MetadataPagination;
  tasksCount: MetadataPagination;
  tipoProyecto: TipoProyecto;
  tipoProyectos: Array<TipoProyecto>;
  tipoProyectosCount: MetadataPagination;
  user: User;
  users: Array<User>;
  usersCount: MetadataPagination;
  validateUserToken: User;
  ventasPorVendedor: Array<SalesPerWorker>;
  ventasPorVendedorDepartamento: Array<VentasPorVendedorDepartamento>;
  visit: Visit;
  visitComent: VisitComent;
  visitComents: Array<VisitComent>;
  visitComentsCount: MetadataPagination;
  visitType: VisitType;
  visitTypes: Array<VisitType>;
  visitTypesCount: MetadataPagination;
  visits: Array<Visit>;
  visitsCount: MetadataPagination;
};


export type QueryCountArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryFletesArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFletessArgs = {
  orderBy?: InputMaybe<Array<FindFletesOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindFletesWhere>;
};


export type QueryFletessCountArgs = {
  orderBy?: InputMaybe<Array<FindFletesOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindFletesWhere>;
};


export type QueryNotificationGroupArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNotificationGroupsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationGroupsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProyectoReferenciasArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProyectoReferenciasCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryApprovalJwtArgs = {
  approvalTokenInput: ApprovalTokenInput;
};


export type QueryCitiesArgs = {
  departmentId?: InputMaybe<Scalars['ID']['input']>;
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryCityArgs = {
  departmentId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type QueryClientArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClientAndContactArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClientContactArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClientContactsArgs = {
  orderBy?: InputMaybe<Array<FindClientContactOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClientContactWhere>;
};


export type QueryClientContactsCountArgs = {
  orderBy?: InputMaybe<Array<FindClientContactOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClientContactWhere>;
};


export type QueryClientsArgs = {
  orderBy?: InputMaybe<Array<FindClientOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClientWhere>;
};


export type QueryClientsCountArgs = {
  orderBy?: InputMaybe<Array<FindClientOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClientWhere>;
};


export type QueryCodeRecoverPasswordArgs = {
  codeRecoverPasswordInput: CodeRecoverPasswordInput;
};


export type QueryCotizacionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCotizacionesArgs = {
  orderBy?: InputMaybe<Array<FindCotizacionOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCotizacionWhere>;
};


export type QueryCotizacionesCountArgs = {
  orderBy?: InputMaybe<Array<FindCotizacionOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCotizacionWhere>;
};


export type QueryCountriesArgs = {
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryCountryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDepartmentArgs = {
  countryId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type QueryDepartmentsArgs = {
  countryId?: InputMaybe<Scalars['ID']['input']>;
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryDocumentTypeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDocumentTypesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryDocumentTypesCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryDummiesArgs = {
  orderBy?: InputMaybe<Array<FindDummyOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindDummyWhere>;
};


export type QueryDummiesCountArgs = {
  orderBy?: InputMaybe<Array<FindDummyOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindDummyWhere>;
};


export type QueryDummyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindAllArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryFindAllFacturaClienteArgs = {
  input: FacturaPorClienteDto;
};


export type QueryFindOneArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindOneFacturaClienteByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryFindSeachCotizacionArgs = {
  cotizacionSeachInput: CotizacionSeachInput;
};


export type QueryFindStatisticStatusProyectArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindUtilidadRealArgs = {
  input: FindUtilidadRealInput;
};


export type QueryGetDataDashboardArgs = {
  id: Scalars['String']['input'];
};


export type QueryGroupArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGroupsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryGroupsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryMarcaProyectoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMarcaProyectosArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryMarcaProyectosCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryMultiKeyRegisterArgs = {
  id: MultikeyRegisterIdInput;
};


export type QueryMultiKeyRegistersArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryMultiKeyRegistersCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNotificationConfigArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNotificationConfigsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationConfigsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPageLinkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPageLinksArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPageLinksCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryParameterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryParametersArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryParametersCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPositionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPositionsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPositionsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProfileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProfilesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProfilesCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProyectCommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProyectCommentsArgs = {
  orderBy?: InputMaybe<Array<FindProyectCommentTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindProyectCommentTypeWhere>;
};


export type QueryProyectCommentsCountArgs = {
  orderBy?: InputMaybe<Array<FindProyectCommentTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindProyectCommentTypeWhere>;
};


export type QueryProyectoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProyectoReferenciaArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProyectosArgs = {
  orderBy?: InputMaybe<Array<FindProyectoOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindProyectoWhere>;
};


export type QueryProyectosCountArgs = {
  orderBy?: InputMaybe<Array<FindProyectoOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindProyectoWhere>;
};


export type QueryReferenciaProyectoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryReferenciaProyectosArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryReferenciaProyectosCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoleFxArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRolesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRolesCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRolesFxArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRolesFxCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QuerySendEmailRecovryPasswordArgs = {
  email: Scalars['String']['input'];
};


export type QueryTaskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTaskCommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTasksArgs = {
  orderBy?: InputMaybe<Array<FindTaskTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindTaskTypeWhere>;
};


export type QueryTasksCommentsArgs = {
  orderBy?: InputMaybe<Array<FindTaskCommentTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindTaskCommentTypeWhere>;
};


export type QueryTasksCommentsCountArgs = {
  orderBy?: InputMaybe<Array<FindTaskCommentTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindTaskCommentTypeWhere>;
};


export type QueryTasksCountArgs = {
  orderBy?: InputMaybe<Array<FindTaskTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindTaskTypeWhere>;
};


export type QueryTipoProyectoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTipoProyectosArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryTipoProyectosCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryUsersCountArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryValidateUserTokenArgs = {
  validateTokenInput: ValidateTokenInput;
};


export type QueryVentasPorVendedorArgs = {
  input: GetSalesInput;
};


export type QueryVentasPorVendedorDepartamentoArgs = {
  input: GetSalesInput;
};


export type QueryVisitArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVisitComentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVisitComentsArgs = {
  orderBy?: InputMaybe<Array<FindVisitComentOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitComentWhere>;
};


export type QueryVisitComentsCountArgs = {
  orderBy?: InputMaybe<Array<FindVisitComentOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitComentWhere>;
};


export type QueryVisitTypeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVisitTypesArgs = {
  orderBy?: InputMaybe<Array<FindVisitTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitTypeWhere>;
};


export type QueryVisitTypesCountArgs = {
  orderBy?: InputMaybe<Array<FindVisitTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitTypeWhere>;
};


export type QueryVisitsArgs = {
  orderBy?: InputMaybe<Array<FindVisitOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitWhere>;
};


export type QueryVisitsCountArgs = {
  orderBy?: InputMaybe<Array<FindVisitOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitWhere>;
};

export enum RecipientType {
  Bcc = 'Bcc',
  Cc = 'Cc',
  Destinatary = 'Destinatary'
}

export type RecoverPasswordInput = {
  email: Scalars['String']['input'];
};

export type ReferenciaProyecto = {
  __typename?: 'ReferenciaProyecto';
  codigo: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  descripcion?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  marca: Array<MarcaProyecto>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime']['output'];
  defaultForType?: Maybe<UserTypes>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  roleFx: Array<RoleFx>;
  updatedAt: Scalars['DateTime']['output'];
  users?: Maybe<Array<User>>;
};

export type RoleFx = {
  __typename?: 'RoleFx';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  permission: Scalars['String']['output'];
  role?: Maybe<Role>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum RouterType {
  ExternalRoute = 'ExternalRoute',
  InternalRouteWithArguments = 'InternalRouteWithArguments',
  InternaltRoute = 'InternaltRoute'
}

export type SalesPerWorker = {
  __typename?: 'SalesPerWorker';
  back: Scalars['Float']['output'];
  costo: Scalars['Float']['output'];
  flete: Scalars['Float']['output'];
  nombre_mes: Scalars['String']['output'];
  numero_mes: Scalars['Int']['output'];
  oip: Scalars['Float']['output'];
  utilidad: Scalars['Float']['output'];
  utilidad_porcentaje: Scalars['Float']['output'];
  vendedor: Scalars['String']['output'];
  venta: Scalars['Float']['output'];
};

export type SendDoubleVerificationInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

export type SigninAdminInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  verificationTypes?: InputMaybe<VerificationTypes>;
};

export type SigninInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  identificationNumber?: InputMaybe<Scalars['String']['input']>;
  identificationType?: InputMaybe<UserDocumentTypes>;
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  personType?: InputMaybe<PersonTypes>;
  verificationDigit?: InputMaybe<Scalars['String']['input']>;
};

export type SignupEmailInput = {
  confirmationPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['ValidatePassword']['input'];
};

export type SignupInput = {
  address: Scalars['String']['input'];
  cityId: Scalars['ID']['input'];
  confirmationEmail: Scalars['String']['input'];
  confirmationPassword: Scalars['String']['input'];
  countryId: Scalars['ID']['input'];
  dateIssue?: InputMaybe<Scalars['DateTime']['input']>;
  departmentId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
  hasRural: Scalars['Boolean']['input'];
  identificationNumber: Scalars['String']['input'];
  identificationType: UserDocumentTypes;
  lastName: Scalars['String']['input'];
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
  legalRepresentativeIdentificationType?: InputMaybe<UserDocumentTypes>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['ValidatePassword']['input'];
  phoneCountryCode: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  secondSurname?: InputMaybe<Scalars['String']['input']>;
};

export type SmsRecipient = {
  email?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
};

export enum StateNotification {
  Complete = 'Complete',
  Draft = 'Draft',
  Error = 'Error'
}

export enum StateNotificationGroup {
  Complete = 'Complete',
  Draft = 'Draft',
  Error = 'Error',
  PartialComplete = 'PartialComplete',
  Process = 'Process'
}

export enum StatePersistent {
  NoPersistent = 'NoPersistent',
  Open = 'Open',
  Receive = 'Receive',
  Send = 'Send'
}

export enum StatusVisitEnum {
  Canceled = 'canceled',
  Confirmed = 'confirmed',
  Programmed = 'programmed',
  Realized = 'realized',
  Reprogrammed = 'reprogrammed'
}

export type StringFilter = {
  _contains?: InputMaybe<Scalars['String']['input']>;
  _endswith?: InputMaybe<Scalars['String']['input']>;
  _eq?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  _like?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  _notcontains?: InputMaybe<Scalars['String']['input']>;
  _notendswith?: InputMaybe<Scalars['String']['input']>;
  _notlike?: InputMaybe<Scalars['String']['input']>;
  _notstartswith?: InputMaybe<Scalars['String']['input']>;
  _startswith?: InputMaybe<Scalars['String']['input']>;
};

export type Task = {
  __typename?: 'Task';
  createdAt: Scalars['DateTime']['output'];
  createdByUser: User;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  taskComment: Array<TaskComment>;
  taskDateExpiration: Scalars['String']['output'];
  taskDescription?: Maybe<Scalars['String']['output']>;
  taskName: Scalars['String']['output'];
  taskPriority: TaskPrioridad;
  taskStatus: TaskStatus;
  updatedAt: Scalars['DateTime']['output'];
  worker: User;
};

export type TaskComment = {
  __typename?: 'TaskComment';
  createdAt: Scalars['DateTime']['output'];
  createdByUser: User;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  file?: Maybe<FileInfo>;
  id: Scalars['ID']['output'];
  task: Task;
  taskDescription?: Maybe<Scalars['String']['output']>;
  taskStatus: TaskStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export enum TaskPrioridad {
  Alta = 'ALTA',
  Baja = 'BAJA',
  Media = 'MEDIA'
}

/** Estado de la tarea */
export enum TaskStatus {
  Cancelada = 'CANCELADA',
  Creada = 'CREADA',
  EnProgreso = 'EN_PROGRESO',
  Pendiente = 'PENDIENTE',
  Realizada = 'REALIZADA',
  Vencida = 'VENCIDA'
}

export type TipoProyecto = {
  __typename?: 'TipoProyecto';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  descripcion?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  nombre: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum TypeClientEnum {
  ClienteFinal = 'CLIENTE_FINAL',
  Distribuidor = 'DISTRIBUIDOR',
  Instalador = 'INSTALADOR',
  Integrador = 'INTEGRADOR'
}

export enum TypeNotification {
  Email = 'Email',
  Push = 'Push',
  Sms = 'Sms',
  Wss = 'Wss'
}

export enum TypeNotificationGroup {
  Automatic = 'Automatic',
  Manual = 'Manual'
}

export enum TypeParameterEnum {
  Date = 'date',
  File = 'file',
  Number = 'number',
  String = 'string'
}

export enum TypeWorker {
  Externo = 'externo',
  Interno = 'interno'
}

export type UpdateClientContactInput = {
  celular?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  telefono?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateClientInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  celular?: InputMaybe<Scalars['String']['input']>;
  cityId?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  numberDocument?: InputMaybe<Scalars['String']['input']>;
  telefono?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TypeClientEnum>;
  userId?: InputMaybe<Scalars['String']['input']>;
  vertical?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCotizacionDetalleInput = {
  id: Scalars['ID']['input'];
  valorCosto?: InputMaybe<Scalars['Float']['input']>;
  valorVenta?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateCotizacionInput = {
  ciudadCliente?: InputMaybe<Scalars['String']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  emailCliente?: InputMaybe<Scalars['String']['input']>;
  fecha?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  nitCliente?: InputMaybe<Scalars['String']['input']>;
  nombreCliente?: InputMaybe<Scalars['String']['input']>;
  nombreVendedor?: InputMaybe<Scalars['String']['input']>;
  numeroCotizacion?: InputMaybe<Scalars['String']['input']>;
  proyectoId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<CotizacionStatusEnum>;
  valor?: InputMaybe<Scalars['Float']['input']>;
  vendedor?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDocumentTypeInput = {
  document?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateDummyInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstField?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  secondField?: InputMaybe<Scalars['DateTime']['input']>;
  thirdField?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateFletesInput = {
  backComision?: InputMaybe<Scalars['Float']['input']>;
  carrier?: InputMaybe<Scalars['String']['input']>;
  carrierCell?: InputMaybe<Scalars['String']['input']>;
  contactClient?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  numberDocument?: InputMaybe<Scalars['String']['input']>;
  numberGuia?: InputMaybe<Scalars['String']['input']>;
  oip?: InputMaybe<Scalars['Float']['input']>;
  valueFlete?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateGroupInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  notificationConfigId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateMarcaInput = {
  id: Scalars['String']['input'];
  isActive: Scalars['Boolean']['input'];
  nombre?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMultikeyRegisterInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: MultikeyRegisterIdInput;
};

export type UpdateNotificationConfigInput = {
  emailDuplicateCode?: InputMaybe<Scalars['String']['input']>;
  emailPrincipalCode?: InputMaybe<Scalars['String']['input']>;
  hasEmail?: InputMaybe<Scalars['Boolean']['input']>;
  hasPush?: InputMaybe<Scalars['Boolean']['input']>;
  hasSms?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsEmail?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsPush?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsSms?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsWss?: InputMaybe<Scalars['Boolean']['input']>;
  hasWss?: InputMaybe<Scalars['Boolean']['input']>;
  html?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  profileId?: InputMaybe<Scalars['ID']['input']>;
  smsBody?: InputMaybe<Scalars['String']['input']>;
  subtype?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<NotificationType>;
  wssCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateNotificationGroupInput = {
  groupId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  metadata?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notificationConfigId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateNotificationInput = {
  emailRecipients?: InputMaybe<Array<EmailRecipient>>;
  id: Scalars['ID']['input'];
  metadata?: InputMaybe<Scalars['String']['input']>;
  notificationGroupId?: InputMaybe<Scalars['ID']['input']>;
  notificationGroupName?: InputMaybe<Scalars['ID']['input']>;
  smsRecipient?: InputMaybe<SmsRecipient>;
  subtypeConfig?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TypeNotification>;
  typeConfig?: InputMaybe<NotificationType>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  wssRecipient?: InputMaybe<WssRecipient>;
};

export type UpdateParametersInput = {
  codigo?: InputMaybe<Scalars['String']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TypeParameterEnum>;
  valueDate?: InputMaybe<Scalars['DateTime']['input']>;
  valueFileId?: InputMaybe<Scalars['ID']['input']>;
  valueInt?: InputMaybe<Scalars['Float']['input']>;
  valueString?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePasswordInput = {
  password: Scalars['ValidatePassword']['input'];
  passwordConfirm: Scalars['ValidatePassword']['input'];
  token: Scalars['String']['input'];
};

export type UpdatePositionInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileInput = {
  city?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  document?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProyectCoomentInput = {
  /** ID del archivo */
  fileId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  /** Saber si viene o no del admin(opcional) */
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Descripción de la tarea (opcional) */
  proyectDescription?: InputMaybe<Scalars['String']['input']>;
  /** ID de la tarea */
  proyectId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProyectoReferenciaInput = {
  id: Scalars['String']['input'];
  isActive: Scalars['Boolean']['input'];
  marcaId?: InputMaybe<Scalars['String']['input']>;
  observacion?: InputMaybe<Scalars['String']['input']>;
  proyectoId?: InputMaybe<Scalars['String']['input']>;
  referenciaId?: InputMaybe<Scalars['String']['input']>;
  tipoProyectoId?: InputMaybe<Scalars['String']['input']>;
  valor?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePryectosInput = {
  /** ID del cliente final */
  cityId?: InputMaybe<Scalars['String']['input']>;
  /** ID del cliente final */
  clientFinalId?: InputMaybe<Scalars['String']['input']>;
  /** ID del cliente integrador */
  clientIntegradorId?: InputMaybe<Scalars['String']['input']>;
  /** Fecha de vencimiento del proyecto */
  dateExpiration?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  /** Datos extras */
  metaData?: InputMaybe<Array<AddReferenciaToProyectoInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProyectosStatusEnum>;
  value?: InputMaybe<Scalars['Float']['input']>;
  /** ID del trabajador asignado a la tarea */
  workerId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReferenciaInput = {
  codigo?: InputMaybe<Scalars['String']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isActive: Scalars['Boolean']['input'];
  marcaId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStatusInput = {
  id: Scalars['String']['input'];
  status: StatusVisitEnum;
  token: Scalars['String']['input'];
};

export type UpdateTaskCoomentInput = {
  /** ID del archivo */
  fileId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  /** Saber si viene o no del admin(opcional) */
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Descripción de la tarea (opcional) */
  taskDescription?: InputMaybe<Scalars['String']['input']>;
  /** ID de la tarea */
  taskId?: InputMaybe<Scalars['String']['input']>;
  /** Estado de la tarea */
  taskStatus?: InputMaybe<TaskStatus>;
};

export type UpdateTaskInput = {
  id: Scalars['ID']['input'];
  /** Saber si viene o no del admin(opcional) */
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Fecha de vencimiento de la tarea */
  taskDateExpiration?: InputMaybe<Scalars['DateTime']['input']>;
  /** Descripción de la tarea (opcional) */
  taskDescription?: InputMaybe<Scalars['String']['input']>;
  /** Nombre de la tarea */
  taskName?: InputMaybe<Scalars['String']['input']>;
  /** Prioridad de la tarea */
  taskPriority?: InputMaybe<TaskPrioridad>;
  /** Estado de la tarea */
  taskStatus?: InputMaybe<TaskStatus>;
  /** ID del trabajador asignado a la tarea */
  workerId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTipoProyectoInput = {
  descripcion?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isActive: Scalars['Boolean']['input'];
  nombre?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInformationInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  cityId?: InputMaybe<Scalars['ID']['input']>;
  countryId?: InputMaybe<Scalars['ID']['input']>;
  dateIssue?: InputMaybe<Scalars['DateTime']['input']>;
  departmentId?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  hasRural?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  identificationNumber?: InputMaybe<Scalars['String']['input']>;
  identificationType?: InputMaybe<UserDocumentTypes>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
  legalRepresentativeIdentificationType?: InputMaybe<UserDocumentTypes>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['ValidatePassword']['input']>;
  phoneCountryCode?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  secondSurname?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<UserTypes>;
  typeWoker?: InputMaybe<TypeWorker>;
  valueTransport?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateUserPasswordInput = {
  currentPassword: Scalars['ValidatePassword']['input'];
  newPassword: Scalars['ValidatePassword']['input'];
  newPasswordConfirm: Scalars['ValidatePassword']['input'];
};

export type UpdateVisitComentInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  status?: InputMaybe<VisitComentStatusEnum>;
  type?: InputMaybe<VisitComentTypeEnum>;
  visitId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVisitInput = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  dateVisit?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isProyect?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<StatusVisitEnum>;
  typeId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVisitTypeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<VisitTypeStatusEnum>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<City>;
  confirmationCode?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime']['output'];
  dateIssue?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  department?: Maybe<Department>;
  email: Scalars['String']['output'];
  emailVerification: Scalars['Boolean']['output'];
  fullName: Scalars['String']['output'];
  hasRural?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  identificationNumber?: Maybe<Scalars['String']['output']>;
  identificationType?: Maybe<UserDocumentTypes>;
  lastName?: Maybe<Scalars['String']['output']>;
  legalRepresentativeIdentificationNumber?: Maybe<Scalars['String']['output']>;
  legalRepresentativeIdentificationType?: Maybe<UserDocumentTypes>;
  manager?: Maybe<User>;
  middleName?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phoneCountryCode?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  phoneVerification: Scalars['Boolean']['output'];
  position?: Maybe<Scalars['String']['output']>;
  secondSurname?: Maybe<Scalars['String']['output']>;
  status: UserStatusTypes;
  subordinates?: Maybe<Array<User>>;
  type: UserTypes;
  typeWoker?: Maybe<TypeWorker>;
  updatedAt: Scalars['DateTime']['output'];
  userRoles: Array<Role>;
  userRolesFx: Array<RoleFx>;
  valueTransport?: Maybe<Scalars['Float']['output']>;
};

export enum UserDocumentTypes {
  CitizenshipCard = 'CitizenshipCard',
  DiplomaticCard = 'DiplomaticCard',
  ForeignerIdentityCard = 'ForeignerIdentityCard',
  IdentityCard = 'IdentityCard',
  Nit = 'Nit',
  Passport = 'Passport',
  SafeConduct = 'SafeConduct',
  SpecialPermissionToStay = 'SpecialPermissionToStay',
  TemporaryProtectionPermit = 'TemporaryProtectionPermit'
}

export type UserKey = {
  __typename?: 'UserKey';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  expirationCode: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  origin: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export enum UserStatusTypes {
  Active = 'Active',
  Inactive = 'Inactive',
  PartlyActive = 'PartlyActive'
}

export enum UserTypes {
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin',
  User = 'User'
}

export type ValidateTokenInput = {
  token: Scalars['String']['input'];
};

export type VentasPorVendedorDepartamento = {
  __typename?: 'VentasPorVendedorDepartamento';
  back: Scalars['Float']['output'];
  costo: Scalars['Float']['output'];
  departamento: Scalars['String']['output'];
  flete: Scalars['Float']['output'];
  oip: Scalars['Float']['output'];
  utilidad: Scalars['Float']['output'];
  utilidad_porcentaje: Scalars['Float']['output'];
  vendedor: Scalars['String']['output'];
  venta: Scalars['Float']['output'];
};

export enum VerificationTypes {
  Email = 'Email',
  Phone = 'Phone'
}

export type Visit = {
  __typename?: 'Visit';
  client: Client;
  createdAt: Scalars['DateTime']['output'];
  dateVisit: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isProyect: Scalars['Boolean']['output'];
  latitude?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['String']['output']>;
  status: StatusVisitEnum;
  type: VisitType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type VisitComent = {
  __typename?: 'VisitComent';
  createdAt: Scalars['DateTime']['output'];
  date?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  status?: Maybe<VisitComentStatusEnum>;
  type: VisitComentTypeEnum;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  visit: Visit;
};

export enum VisitComentStatusEnum {
  Canceled = 'CANCELED',
  Pendinig = 'PENDINIG',
  Realized = 'REALIZED'
}

export enum VisitComentTypeEnum {
  Commitments = 'COMMITMENTS',
  Results = 'RESULTS'
}

export type VisitDashboardModel = {
  __typename?: 'VisitDashboardModel';
  earrings: Array<Visit>;
  realized: Array<Visit>;
};

export type VisitType = {
  __typename?: 'VisitType';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: VisitTypeStatusEnum;
  updatedAt: Scalars['DateTime']['output'];
};

export enum VisitTypeStatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type WssRecipient = {
  document?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
  phonePrefix?: InputMaybe<Scalars['String']['input']>;
};

export type FindOneFacturaClienteByCode = {
  __typename?: 'findOneFacturaClienteByCode';
  flete?: Maybe<Fletes>;
  isFound: Scalars['Boolean']['output'];
};

export type FindUtilidadRealInput = {
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};

export type FindUtilidadRealModel = {
  __typename?: 'findUtilidadRealModel';
  utilidad: Scalars['Float']['output'];
  utilidad_porcentaje: Scalars['Float']['output'];
};

export type UtilidadRealModel = {
  __typename?: 'utilidadRealModel';
  grupo: FindUtilidadRealModel;
  trabajadores: Array<UtilidadRealTModel>;
};

export type UtilidadRealTModel = {
  __typename?: 'utilidadRealTModel';
  comision: Scalars['Float']['output'];
  costo: Scalars['Float']['output'];
  flete: Scalars['Float']['output'];
  nombre: Scalars['String']['output'];
  number_document: Scalars['String']['output'];
  oip: Scalars['Float']['output'];
  porcentaje: Scalars['Float']['output'];
  presupuesto: Scalars['String']['output'];
  totalVendido: Scalars['String']['output'];
  utilidad: Scalars['Float']['output'];
  utilidadPorcentaje: Scalars['Float']['output'];
  utilidadReal: Scalars['Float']['output'];
  venta: Scalars['Float']['output'];
};

export type ValidateUserTokenQueryVariables = Exact<{
  validateTokenInput: ValidateTokenInput;
}>;


export type ValidateUserTokenQuery = { __typename?: 'Query', validateUserToken: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> } };

export type SigninMutationVariables = Exact<{
  signinInput: SigninInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> } } };

export type UserFragmentFragment = { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> };

export type ClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClientsQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, descripcion?: string | null, type?: TypeClientEnum | null, vertical?: string | null, celular: string }> };

export type ClientsUserQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindClientOrderBy> | FindClientOrderBy>;
  where?: InputMaybe<FindClientWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type ClientsUserQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, type?: TypeClientEnum | null, vertical?: string | null, descripcion?: string | null, celular: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, user?: { __typename?: 'User', name?: string | null, id: string, email: string } | null }>, clientsCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type ClientQueryVariables = Exact<{
  clientId: Scalars['ID']['input'];
}>;


export type ClientQuery = { __typename?: 'Query', client: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, type?: TypeClientEnum | null, vertical?: string | null, celular: string, descripcion?: string | null, department?: { __typename?: 'Department', id: string, name: string } | null, city?: { __typename?: 'City', id: string, name: string } | null, user?: { __typename?: 'User', id: string, fullName: string } | null } };

export type CreateClientMutationVariables = Exact<{
  createInput: CreateClientInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: { __typename?: 'Client', id: string } };

export type RemoveClientMutationVariables = Exact<{
  removeClientId: Scalars['ID']['input'];
}>;


export type RemoveClientMutation = { __typename?: 'Mutation', removeClient: { __typename?: 'Client', id: string } };

export type UpdateClientMutationVariables = Exact<{
  updateInput: UpdateClientInput;
}>;


export type UpdateClientMutation = { __typename?: 'Mutation', updateClient: { __typename?: 'Client', id: string } };

export type VisitComentsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindVisitComentOrderBy> | FindVisitComentOrderBy>;
  where?: InputMaybe<FindVisitComentWhere>;
}>;


export type VisitComentsQuery = { __typename?: 'Query', visitComents: Array<{ __typename?: 'VisitComent', status?: VisitComentStatusEnum | null, type: VisitComentTypeEnum, id: string, description: string, createdAt: any, date?: any | null, user: { __typename?: 'User', name?: string | null }, visit: { __typename?: 'Visit', id: string, client: { __typename?: 'Client', name: string } } }> };

export type ClientContactsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindClientContactOrderBy> | FindClientContactOrderBy>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClientContactWhere>;
}>;


export type ClientContactsQuery = { __typename?: 'Query', clientContacts: Array<{ __typename?: 'ClientContact', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, celular: string, email: string, position: string, telefono?: string | null, client?: { __typename?: 'Client', id: string, name: string, numberDocument: string, telefono?: string | null, type?: TypeClientEnum | null, email: string } | null }>, clientContactsCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type ClientsOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClientsOptionsQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'Client', id: string, name: string }> };

export type PositionsQueryVariables = Exact<{ [key: string]: never; }>;


export type PositionsQuery = { __typename?: 'Query', positions: Array<{ __typename?: 'Position', id: string, name: string }> };

export type RemoveClientContactMutationVariables = Exact<{
  removeClientContactId: Scalars['ID']['input'];
}>;


export type RemoveClientContactMutation = { __typename?: 'Mutation', removeClientContact: { __typename?: 'ClientContact', id: string, name: string } };

export type UpdateClientContactMutationVariables = Exact<{
  updateInput: UpdateClientContactInput;
}>;


export type UpdateClientContactMutation = { __typename?: 'Mutation', updateClientContact: { __typename?: 'ClientContact', id: string, name: string } };

export type CreateClientContactMutationVariables = Exact<{
  createInput: CreateClientContactInput;
}>;


export type CreateClientContactMutation = { __typename?: 'Mutation', createClientContact: { __typename?: 'ClientContact', id: string, name: string } };

export type CotizacionesQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindCotizacionOrderBy> | FindCotizacionOrderBy>;
  where?: InputMaybe<FindCotizacionWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type CotizacionesQuery = { __typename?: 'Query', cotizaciones: Array<{ __typename?: 'Cotizacion', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, numeroCotizacion: string, fecha: any, nombreCliente: string, nombreVendedor: string, vendedor: string, ciudadCliente: string, emailCliente: string, nitCliente: string, valor: number }>, cotizacionesCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type FindSeachCotizacionQueryVariables = Exact<{
  cotizacionSeachInput: CotizacionSeachInput;
}>;


export type FindSeachCotizacionQuery = { __typename?: 'Query', findSeachCotizacion: boolean };

export type CotizacionQueryVariables = Exact<{
  cotizacionId: Scalars['ID']['input'];
}>;


export type CotizacionQuery = { __typename?: 'Query', cotizacion: { __typename?: 'Cotizacion', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, numeroCotizacion: string, fecha: any, nombreCliente: string, nombreVendedor: string, vendedor: string, ciudadCliente: string, emailCliente: string, nitCliente: string, valor: number, descripcion?: string | null, status?: CotizacionStatusEnum | null, proyecto?: { __typename?: 'Proyectos', name: string, status: ProyectosStatusEnum, description?: string | null, value: number, id: string } | null, detalle?: Array<{ __typename?: 'DetalleCotizacion', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, referencia: string, descripcion: string, unidadMedida: string, cantidad: number, valorCosto: number, valorVenta: number, total: number, uuid: number }> | null } };

export type SaveDetalleCotizacionMutationVariables = Exact<{
  saveDetalleCotizacionId: Scalars['String']['input'];
}>;


export type SaveDetalleCotizacionMutation = { __typename?: 'Mutation', saveDetalleCotizacion: boolean };

export type UpdateCotizacionMutationVariables = Exact<{
  updateInput: UpdateCotizacionInput;
}>;


export type UpdateCotizacionMutation = { __typename?: 'Mutation', updateCotizacion: { __typename?: 'Cotizacion', id: string } };

export type UpdateDetalleCotizacionMutationVariables = Exact<{
  updateInput: UpdateCotizacionDetalleInput;
}>;


export type UpdateDetalleCotizacionMutation = { __typename?: 'Mutation', updateDetalleCotizacion: { __typename?: 'DetalleCotizacion', id: string } };

export type FindAllFacturaClienteQueryVariables = Exact<{
  input: FacturaPorClienteDto;
}>;


export type FindAllFacturaClienteQuery = { __typename?: 'Query', findAllFacturaCliente: Array<{ __typename?: 'FletesWithDocument', numberDocument?: string | null, description?: string | null, valueFlete?: number | null, oip?: number | null, backComision?: number | null, numberGuia?: string | null, carrier?: string | null, carrierCell?: string | null, contactClient?: string | null, TEM_CEDULA?: string | null, TEM_NOMCLI?: string | null, TEM_FECHA?: string | null, TEM_TIPMOV?: string | null, TEM_PREFIJ?: string | null, TEM_NUMDOC?: string | null, TEM_VENDED?: string | null, TEM_VENTA?: string | null, TEM_VALCOS?: string | null, TEM_UTILIDAD?: string | null, TEM_PORCENTAJE_UTILIDAD?: string | null, CL_DEPART?: string | null, CLI_CIUDAD?: string | null }> };

export type FindOneFacturaClienteByCodeQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type FindOneFacturaClienteByCodeQuery = { __typename?: 'Query', findOneFacturaClienteByCode: { __typename?: 'findOneFacturaClienteByCode', isFound: boolean, flete?: { __typename?: 'Fletes', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, numberDocument: string, description: string, valueFlete: number, oip: number, backComision: number, numberGuia: string, carrier: string, carrierCell: string, contactClient: string } | null } };

export type CreateFletesMutationVariables = Exact<{
  createInput: CreateFletesInput;
}>;


export type CreateFletesMutation = { __typename?: 'Mutation', createFletes: { __typename?: 'Fletes', id: string } };

export type UpdateFletesMutationVariables = Exact<{
  updateInput: UpdateFletesInput;
}>;


export type UpdateFletesMutation = { __typename?: 'Mutation', updateFletes: { __typename?: 'Fletes', id: string } };

export type FindUtilidadRealQueryVariables = Exact<{
  input: FindUtilidadRealInput;
}>;


export type FindUtilidadRealQuery = { __typename?: 'Query', findUtilidadReal: { __typename?: 'utilidadRealModel', trabajadores: Array<{ __typename?: 'utilidadRealTModel', number_document: string, nombre: string, venta: number, costo: number, flete: number, comision: number, oip: number, utilidadReal: number, utilidadPorcentaje: number, utilidad: number, porcentaje: number, totalVendido: string, presupuesto: string }>, grupo: { __typename?: 'findUtilidadRealModel', utilidad: number, utilidad_porcentaje: number } } };

export type DepartmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type DepartmentsQuery = { __typename?: 'Query', departments: Array<{ __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string }> };

export type CitiesQueryVariables = Exact<{
  departmentId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CitiesQuery = { __typename?: 'Query', cities: Array<{ __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string, department?: { __typename?: 'Department', code: number, createdAt: any, deletedAt?: any | null, id: string, name: string, updatedAt: any } | null }> };

export type ResetPasswordMutationVariables = Exact<{
  password: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'User', email: string } };

export type SendEmailRecovryPasswordQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendEmailRecovryPasswordQuery = { __typename?: 'Query', sendEmailRecovryPassword: string };

export type ParametersQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
}>;


export type ParametersQuery = { __typename?: 'Query', parameters: Array<{ __typename?: 'Parameter', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, codigo: string, descripcion: string, type: TypeParameterEnum, valueInt?: number | null, valueString?: string | null, valueDate?: any | null, valueFile?: { __typename?: 'FileInfo', id: string, url: string, fileMongoId?: string | null, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes } | null }>, parametersCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type RemoveParameterMutationVariables = Exact<{
  removeParameterId: Scalars['ID']['input'];
}>;


export type RemoveParameterMutation = { __typename?: 'Mutation', removeParameter: { __typename?: 'Parameter', id: string, name: string, type: TypeParameterEnum, descripcion: string } };

export type UpdateParameterMutationVariables = Exact<{
  updateInput: UpdateParametersInput;
}>;


export type UpdateParameterMutation = { __typename?: 'Mutation', updateParameter: { __typename?: 'Parameter', id: string, name: string, descripcion: string } };

export type CreateParameterMutationVariables = Exact<{
  createInput: CreateParametersInput;
}>;


export type CreateParameterMutation = { __typename?: 'Mutation', createParameter: { __typename?: 'Parameter', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, codigo: string, descripcion: string, type: TypeParameterEnum, valueInt?: number | null, valueString?: string | null, valueDate?: any | null, valueFile?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, url: string } | null } };

export type CrearConceptoMutationVariables = Exact<{
  data: CrearConceptoDto;
}>;


export type CrearConceptoMutation = { __typename?: 'Mutation', crearConcepto: { __typename?: 'ConceptoTable', id: string, nombre: string, esSuma: boolean, editable?: boolean | null, valores: string } };

export type UpdateConceptoMutationVariables = Exact<{
  actualizarConceptoDto: ActualizarConceptoDto;
}>;


export type UpdateConceptoMutation = { __typename?: 'Mutation', updateConcepto: { __typename?: 'ConceptoTable', id: string, nombre: string, esSuma: boolean, editable?: boolean | null, valores: string } };

export type EliminarConceptoMutationVariables = Exact<{
  eliminarConceptoDto: Scalars['String']['input'];
}>;


export type EliminarConceptoMutation = { __typename?: 'Mutation', eliminarConcepto: string };

export type CreateProyectoMutationVariables = Exact<{
  createInput: CreateProyectosInput;
}>;


export type CreateProyectoMutation = { __typename?: 'Mutation', createProyecto: { __typename?: 'Proyectos', id: string } };

export type ProyectosQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindProyectoWhere>;
  orderBy?: InputMaybe<Array<FindProyectoOrderBy> | FindProyectoOrderBy>;
}>;


export type ProyectosQuery = { __typename?: 'Query', proyectos: Array<{ __typename?: 'Proyectos', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, value: number, status: ProyectosStatusEnum, dateExpiration: any, description?: string | null, clientIntegrador: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, descripcion?: string | null, type?: TypeClientEnum | null, vertical?: string | null, celular: string, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, user?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string } | null }, clientFinal: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, descripcion?: string | null, type?: TypeClientEnum | null, vertical?: string | null, celular: string }, worker: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, manager?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string } | null, subordinates?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> }, createdByUser: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null }>, proyectosCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type UpdateProyectoMutationVariables = Exact<{
  updateInput: UpdatePryectosInput;
}>;


export type UpdateProyectoMutation = { __typename?: 'Mutation', updateProyecto: { __typename?: 'Proyectos', id: string } };

export type ProyectoQueryVariables = Exact<{
  proyectoId: Scalars['ID']['input'];
}>;


export type ProyectoQuery = { __typename?: 'Query', proyecto: { __typename?: 'Proyectos', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, value: number, status: ProyectosStatusEnum, dateExpiration: any, description?: string | null, clientIntegrador: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, descripcion?: string | null, type?: TypeClientEnum | null, vertical?: string | null, celular: string, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, user?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string } | null }, clientFinal: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, descripcion?: string | null, type?: TypeClientEnum | null, vertical?: string | null, celular: string }, worker: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, manager?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string } | null, subordinates?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> }, createdByUser: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, referencias?: Array<{ __typename?: 'ProyectoReferencia', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, observacion?: string | null, valor: number, tipoProyecto: { __typename?: 'TipoProyecto', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, nombre: string, descripcion?: string | null, isActive: boolean }, marca: { __typename?: 'MarcaProyecto', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, nombre: string, isActive: boolean }, referencia: { __typename?: 'ReferenciaProyecto', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, codigo: string, descripcion?: string | null, isActive: boolean } }> | null } };

export type CreateProyectCommentMutationVariables = Exact<{
  createInput: CreateProyectCommentInput;
}>;


export type CreateProyectCommentMutation = { __typename?: 'Mutation', createProyectComment: { __typename?: 'ProyectComment', id: string } };

export type UpdateProyectCommentMutationVariables = Exact<{
  updateInput: UpdateProyectCoomentInput;
}>;


export type UpdateProyectCommentMutation = { __typename?: 'Mutation', updateProyectComment: { __typename?: 'ProyectComment', id: string } };

export type ProyectCommentsQueryVariables = Exact<{
  where?: InputMaybe<FindProyectCommentTypeWhere>;
  orderBy?: InputMaybe<Array<FindProyectCommentTypeOrderBy> | FindProyectCommentTypeOrderBy>;
}>;


export type ProyectCommentsQuery = { __typename?: 'Query', proyectComments: Array<{ __typename?: 'ProyectComment', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, proyectDescription?: string | null, createdByUser: { __typename?: 'User', identificationNumber?: string | null, identificationType?: UserDocumentTypes | null, email: string, fullName: string }, file?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, url: string, chunkSize?: number | null } | null }> };

export type FindStatisticStatusProyectQueryVariables = Exact<{
  findStatisticStatusProyectId: Scalars['ID']['input'];
}>;


export type FindStatisticStatusProyectQuery = { __typename?: 'Query', findStatisticStatusProyect: Array<{ __typename?: 'ProyectoEmbudoDto', valorTotal: number, cantidad: number, estado: ProyectosStatusEnum, userId: string }> };

export type TipoProyectosQueryVariables = Exact<{ [key: string]: never; }>;


export type TipoProyectosQuery = { __typename?: 'Query', tipoProyectos: Array<{ __typename?: 'TipoProyecto', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, nombre: string, descripcion?: string | null, isActive: boolean }> };

export type MarcaProyectosQueryVariables = Exact<{ [key: string]: never; }>;


export type MarcaProyectosQuery = { __typename?: 'Query', marcaProyectos: Array<{ __typename?: 'MarcaProyecto', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, nombre: string, isActive: boolean, referencias: Array<{ __typename?: 'ReferenciaProyecto', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, codigo: string, descripcion?: string | null, isActive: boolean }> }> };

export type RemoveProyectoReferenciaMutationVariables = Exact<{
  removeProyectoReferenciaId: Scalars['ID']['input'];
}>;


export type RemoveProyectoReferenciaMutation = { __typename?: 'Mutation', removeProyectoReferencia: { __typename?: 'ProyectoReferencia', id: string } };

export type CreateProyectoReferenciaMutationVariables = Exact<{
  createInput: AddReferenciaToProyectoInput;
}>;


export type CreateProyectoReferenciaMutation = { __typename?: 'Mutation', createProyectoReferencia: { __typename?: 'ProyectoReferencia', id: string } };

export type TasksQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindTaskTypeOrderBy> | FindTaskTypeOrderBy>;
  where?: InputMaybe<FindTaskTypeWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type TasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, taskName: string, taskDescription?: string | null, taskDateExpiration: string, taskPriority: TaskPrioridad, taskStatus: TaskStatus, worker: { __typename?: 'User', email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, fullName: string }, createdByUser: { __typename?: 'User', email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, fullName: string }, taskComment: Array<{ __typename?: 'TaskComment', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, taskDescription?: string | null, taskStatus: TaskStatus, createdByUser: { __typename?: 'User', email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, fullName: string }, file?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, url: string } | null }> }> };

export type CreateTaskMutationVariables = Exact<{
  createInput: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string } };

export type UpdateTaskMutationVariables = Exact<{
  updateInput: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Task', id: string } };

export type CreateTaskCommentMutationVariables = Exact<{
  createInput: CreateTaskCommentInput;
}>;


export type CreateTaskCommentMutation = { __typename?: 'Mutation', createTaskComment: { __typename?: 'TaskComment', id: string } };

export type UpdateTaskCommentMutationVariables = Exact<{
  updateInput: UpdateTaskCoomentInput;
}>;


export type UpdateTaskCommentMutation = { __typename?: 'Mutation', updateTaskComment: { __typename?: 'TaskComment', id: string } };

export type UsersQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindUsersOrderBy> | FindUsersOrderBy>;
  where?: InputMaybe<FindUsersWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, valueTransport?: number | null, typeWoker?: TypeWorker | null, fullName: string, subordinates?: Array<{ __typename?: 'User', id: string, fullName: string, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null }> | null, city?: { __typename?: 'City', id: string, name: string } | null, department?: { __typename?: 'Department', id: string, name: string } | null, country?: { __typename?: 'Country', id: string, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, name: string }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string }> }>, usersCount: { __typename?: 'MetadataPagination', currentPage?: number | null, itemsPerPage?: number | null, totalItems?: number | null, totalPages?: number | null } };

export type CreateUserMutationVariables = Exact<{
  createInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string } };

export type RemoveUserMutationVariables = Exact<{
  removeUserId: Scalars['ID']['input'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', id: string, fullName: string, name?: string | null } };

export type UpdateUserMutationVariables = Exact<{
  updateInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, fullName: string, lastName?: string | null } };

export type AssignSubordinateMutationVariables = Exact<{
  managerId: Scalars['String']['input'];
  subordinateId: Scalars['String']['input'];
}>;


export type AssignSubordinateMutation = { __typename?: 'Mutation', assignSubordinate: { __typename?: 'User', id: string } };

export type RemoveSubordinateMutationVariables = Exact<{
  managerId: Scalars['String']['input'];
  subordinateId: Scalars['String']['input'];
}>;


export type RemoveSubordinateMutation = { __typename?: 'Mutation', removeSubordinate: { __typename?: 'User', id: string } };

export type VisitsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindVisitOrderBy> | FindVisitOrderBy>;
  where?: InputMaybe<FindVisitWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type VisitsQuery = { __typename?: 'Query', visits: Array<{ __typename?: 'Visit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, location?: string | null, dateVisit: any, status: StatusVisitEnum, isProyect: boolean, latitude?: string | null, longitude?: string | null, client: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, type?: TypeClientEnum | null, vertical?: string | null, celular: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null }, type: { __typename?: 'VisitType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, status: VisitTypeStatusEnum }, user: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> } }>, visitsCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type VisitTypesQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindVisitTypeOrderBy> | FindVisitTypeOrderBy>;
  where?: InputMaybe<FindVisitTypeWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type VisitTypesQuery = { __typename?: 'Query', visitTypes: Array<{ __typename?: 'VisitType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, status: VisitTypeStatusEnum }>, visitTypesCount: { __typename?: 'MetadataPagination', currentPage?: number | null, itemsPerPage?: number | null, totalItems?: number | null, totalPages?: number | null } };

export type CreateVisitTypeMutationVariables = Exact<{
  createInput: CreateVisitTypeInput;
}>;


export type CreateVisitTypeMutation = { __typename?: 'Mutation', createVisitType: { __typename?: 'VisitType', id: string } };

export type VisitQueryVariables = Exact<{
  visitId: Scalars['ID']['input'];
}>;


export type VisitQuery = { __typename?: 'Query', visit: { __typename?: 'Visit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, location?: string | null, dateVisit: any, status: StatusVisitEnum, isProyect: boolean, longitude?: string | null, latitude?: string | null, client: { __typename?: 'Client', id: string, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, type?: TypeClientEnum | null, vertical?: string | null, celular: string, createdAt: any }, type: { __typename?: 'VisitType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, status: VisitTypeStatusEnum } } };

export type UpdateVisitTypeMutationVariables = Exact<{
  updateInput: UpdateVisitTypeInput;
}>;


export type UpdateVisitTypeMutation = { __typename?: 'Mutation', updateVisitType: { __typename?: 'VisitType', id: string } };

export type RemoveVisitTypeMutationVariables = Exact<{
  removeVisitTypeId: Scalars['ID']['input'];
}>;


export type RemoveVisitTypeMutation = { __typename?: 'Mutation', removeVisitType: { __typename?: 'VisitType', id: string } };

export type UpdateVisitMutationVariables = Exact<{
  updateInput: UpdateVisitInput;
}>;


export type UpdateVisitMutation = { __typename?: 'Mutation', updateVisit: { __typename?: 'Visit', id: string } };

export type AcceptOrDeclineVisitMutationVariables = Exact<{
  updateStatusInput: UpdateStatusInput;
}>;


export type AcceptOrDeclineVisitMutation = { __typename?: 'Mutation', acceptOrDeclineVisit: string };

export type CreateVisitComentMutationVariables = Exact<{
  createInput: CreateVisitComentInput;
}>;


export type CreateVisitComentMutation = { __typename?: 'Mutation', createVisitComent: { __typename?: 'VisitComent', id: string } };

export type CreateVisitMutationVariables = Exact<{
  createInput: CreateVisitInput;
}>;


export type CreateVisitMutation = { __typename?: 'Mutation', createVisit: { __typename?: 'Visit', id: string } };

export type VentasPorVendedorQueryVariables = Exact<{
  input: GetSalesInput;
}>;


export type VentasPorVendedorQuery = { __typename?: 'Query', ventasPorVendedor: Array<{ __typename?: 'SalesPerWorker', vendedor: string, nombre_mes: string, numero_mes: number, venta: number, costo: number, oip: number, flete: number, back: number, utilidad: number, utilidad_porcentaje: number }> };

export type VentasPorVendedorDepartamentoQueryVariables = Exact<{
  input: GetSalesInput;
}>;


export type VentasPorVendedorDepartamentoQuery = { __typename?: 'Query', ventasPorVendedorDepartamento: Array<{ __typename?: 'VentasPorVendedorDepartamento', vendedor: string, departamento: string, venta: number, costo: number, oip: number, flete: number, back: number, utilidad: number, utilidad_porcentaje: number }> };

export type GetDataDashboardQueryVariables = Exact<{
  getDataDashboardId: Scalars['String']['input'];
}>;


export type GetDataDashboardQuery = { __typename?: 'Query', getDataDashboard: Array<{ __typename?: 'DashboardDataModal', label: string, total: number, idUser: string }> };

export const UserFragmentFragmentDoc = gql`
    fragment userFragment on User {
  id
  createdAt
  updatedAt
  deletedAt
  name
  middleName
  lastName
  secondSurname
  email
  identificationType
  identificationNumber
  dateIssue
  legalRepresentativeIdentificationType
  legalRepresentativeIdentificationNumber
  phoneCountryCode
  phoneNumber
  address
  hasRural
  confirmationCode
  position
  status
  phoneVerification
  emailVerification
  type
  city {
    id
    createdAt
    updatedAt
    deletedAt
    code
    name
  }
  department {
    id
    createdAt
    updatedAt
    deletedAt
    code
    name
  }
  country {
    id
    createdAt
    updatedAt
    deletedAt
    code
    name
  }
  userRoles {
    id
    createdAt
    updatedAt
    deletedAt
    name
    description
    defaultForType
    users {
      id
      createdAt
      updatedAt
      deletedAt
      name
      middleName
      lastName
      secondSurname
      email
      identificationType
      identificationNumber
      dateIssue
      legalRepresentativeIdentificationType
      legalRepresentativeIdentificationNumber
      phoneCountryCode
      phoneNumber
      address
      hasRural
      confirmationCode
      position
      status
      phoneVerification
      emailVerification
      type
      fullName
    }
    roleFx {
      id
      createdAt
      updatedAt
      deletedAt
      permission
    }
  }
  userRolesFx {
    id
    createdAt
    updatedAt
    deletedAt
    permission
    role {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      defaultForType
    }
  }
  fullName
}
    `;
export const ValidateUserTokenDocument = gql`
    query ValidateUserToken($validateTokenInput: ValidateTokenInput!) {
  validateUserToken(validateTokenInput: $validateTokenInput) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    middleName
    lastName
    secondSurname
    email
    identificationType
    identificationNumber
    dateIssue
    legalRepresentativeIdentificationType
    legalRepresentativeIdentificationNumber
    phoneCountryCode
    phoneNumber
    address
    hasRural
    confirmationCode
    position
    status
    phoneVerification
    emailVerification
    type
    city {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    department {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    country {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    userRoles {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      defaultForType
      users {
        id
        createdAt
        updatedAt
        deletedAt
        name
        middleName
        lastName
        secondSurname
        email
        identificationType
        identificationNumber
        dateIssue
        legalRepresentativeIdentificationType
        legalRepresentativeIdentificationNumber
        phoneCountryCode
        phoneNumber
        address
        hasRural
        confirmationCode
        position
        status
        phoneVerification
        emailVerification
        type
        fullName
      }
      roleFx {
        id
        createdAt
        updatedAt
        deletedAt
        permission
      }
    }
    userRolesFx {
      id
      createdAt
      updatedAt
      deletedAt
      permission
      role {
        id
        createdAt
        updatedAt
        deletedAt
        name
        description
        defaultForType
      }
    }
    fullName
  }
}
    `;

/**
 * __useValidateUserTokenQuery__
 *
 * To run a query within a React component, call `useValidateUserTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateUserTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateUserTokenQuery({
 *   variables: {
 *      validateTokenInput: // value for 'validateTokenInput'
 *   },
 * });
 */
export function useValidateUserTokenQuery(baseOptions: Apollo.QueryHookOptions<ValidateUserTokenQuery, ValidateUserTokenQueryVariables> & ({ variables: ValidateUserTokenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>(ValidateUserTokenDocument, options);
      }
export function useValidateUserTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>(ValidateUserTokenDocument, options);
        }
export function useValidateUserTokenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>(ValidateUserTokenDocument, options);
        }
export type ValidateUserTokenQueryHookResult = ReturnType<typeof useValidateUserTokenQuery>;
export type ValidateUserTokenLazyQueryHookResult = ReturnType<typeof useValidateUserTokenLazyQuery>;
export type ValidateUserTokenSuspenseQueryHookResult = ReturnType<typeof useValidateUserTokenSuspenseQuery>;
export type ValidateUserTokenQueryResult = Apollo.QueryResult<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>;
export const SigninDocument = gql`
    mutation Signin($signinInput: SigninInput!) {
  signin(signinInput: $signinInput) {
    token
    user {
      ...userFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;
export type SigninMutationFn = Apollo.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      signinInput: // value for 'signinInput'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: Apollo.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, options);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<SigninMutation, SigninMutationVariables>;
export const ClientsDocument = gql`
    query Clients {
  clients {
    id
    createdAt
    updatedAt
    deletedAt
    name
    numberDocument
    email
    telefono
    address
    descripcion
    type
    vertical
    celular
  }
}
    `;

/**
 * __useClientsQuery__
 *
 * To run a query within a React component, call `useClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useClientsQuery(baseOptions?: Apollo.QueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, options);
      }
export function useClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, options);
        }
export function useClientsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, options);
        }
export type ClientsQueryHookResult = ReturnType<typeof useClientsQuery>;
export type ClientsLazyQueryHookResult = ReturnType<typeof useClientsLazyQuery>;
export type ClientsSuspenseQueryHookResult = ReturnType<typeof useClientsSuspenseQuery>;
export type ClientsQueryResult = Apollo.QueryResult<ClientsQuery, ClientsQueryVariables>;
export const ClientsUserDocument = gql`
    query ClientsUser($orderBy: [FindClientOrderBy!], $where: FindClientWhere, $pagination: Pagination) {
  clients(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    numberDocument
    email
    telefono
    address
    type
    vertical
    descripcion
    celular
    city {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    department {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    country {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    user {
      name
      id
      email
    }
  }
  clientsCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useClientsUserQuery__
 *
 * To run a query within a React component, call `useClientsUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientsUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientsUserQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useClientsUserQuery(baseOptions?: Apollo.QueryHookOptions<ClientsUserQuery, ClientsUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientsUserQuery, ClientsUserQueryVariables>(ClientsUserDocument, options);
      }
export function useClientsUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientsUserQuery, ClientsUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientsUserQuery, ClientsUserQueryVariables>(ClientsUserDocument, options);
        }
export function useClientsUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ClientsUserQuery, ClientsUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ClientsUserQuery, ClientsUserQueryVariables>(ClientsUserDocument, options);
        }
export type ClientsUserQueryHookResult = ReturnType<typeof useClientsUserQuery>;
export type ClientsUserLazyQueryHookResult = ReturnType<typeof useClientsUserLazyQuery>;
export type ClientsUserSuspenseQueryHookResult = ReturnType<typeof useClientsUserSuspenseQuery>;
export type ClientsUserQueryResult = Apollo.QueryResult<ClientsUserQuery, ClientsUserQueryVariables>;
export const ClientDocument = gql`
    query Client($clientId: ID!) {
  client(id: $clientId) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    numberDocument
    email
    telefono
    address
    type
    vertical
    celular
    descripcion
    department {
      id
      name
    }
    city {
      id
      name
    }
    user {
      id
      fullName
    }
  }
}
    `;

/**
 * __useClientQuery__
 *
 * To run a query within a React component, call `useClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useClientQuery(baseOptions: Apollo.QueryHookOptions<ClientQuery, ClientQueryVariables> & ({ variables: ClientQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientQuery, ClientQueryVariables>(ClientDocument, options);
      }
export function useClientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientQuery, ClientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientQuery, ClientQueryVariables>(ClientDocument, options);
        }
export function useClientSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ClientQuery, ClientQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ClientQuery, ClientQueryVariables>(ClientDocument, options);
        }
export type ClientQueryHookResult = ReturnType<typeof useClientQuery>;
export type ClientLazyQueryHookResult = ReturnType<typeof useClientLazyQuery>;
export type ClientSuspenseQueryHookResult = ReturnType<typeof useClientSuspenseQuery>;
export type ClientQueryResult = Apollo.QueryResult<ClientQuery, ClientQueryVariables>;
export const CreateClientDocument = gql`
    mutation CreateClient($createInput: CreateClientInput!) {
  createClient(createInput: $createInput) {
    id
  }
}
    `;
export type CreateClientMutationFn = Apollo.MutationFunction<CreateClientMutation, CreateClientMutationVariables>;

/**
 * __useCreateClientMutation__
 *
 * To run a mutation, you first call `useCreateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientMutation, { data, loading, error }] = useCreateClientMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateClientMutation(baseOptions?: Apollo.MutationHookOptions<CreateClientMutation, CreateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, options);
      }
export type CreateClientMutationHookResult = ReturnType<typeof useCreateClientMutation>;
export type CreateClientMutationResult = Apollo.MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = Apollo.BaseMutationOptions<CreateClientMutation, CreateClientMutationVariables>;
export const RemoveClientDocument = gql`
    mutation RemoveClient($removeClientId: ID!) {
  removeClient(id: $removeClientId) {
    id
  }
}
    `;
export type RemoveClientMutationFn = Apollo.MutationFunction<RemoveClientMutation, RemoveClientMutationVariables>;

/**
 * __useRemoveClientMutation__
 *
 * To run a mutation, you first call `useRemoveClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeClientMutation, { data, loading, error }] = useRemoveClientMutation({
 *   variables: {
 *      removeClientId: // value for 'removeClientId'
 *   },
 * });
 */
export function useRemoveClientMutation(baseOptions?: Apollo.MutationHookOptions<RemoveClientMutation, RemoveClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveClientMutation, RemoveClientMutationVariables>(RemoveClientDocument, options);
      }
export type RemoveClientMutationHookResult = ReturnType<typeof useRemoveClientMutation>;
export type RemoveClientMutationResult = Apollo.MutationResult<RemoveClientMutation>;
export type RemoveClientMutationOptions = Apollo.BaseMutationOptions<RemoveClientMutation, RemoveClientMutationVariables>;
export const UpdateClientDocument = gql`
    mutation UpdateClient($updateInput: UpdateClientInput!) {
  updateClient(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateClientMutationFn = Apollo.MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, options);
      }
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const VisitComentsDocument = gql`
    query VisitComents($orderBy: [FindVisitComentOrderBy!], $where: FindVisitComentWhere) {
  visitComents(orderBy: $orderBy, where: $where) {
    status
    type
    user {
      name
    }
    id
    description
    createdAt
    date
    visit {
      id
      client {
        name
      }
    }
  }
}
    `;

/**
 * __useVisitComentsQuery__
 *
 * To run a query within a React component, call `useVisitComentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVisitComentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVisitComentsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useVisitComentsQuery(baseOptions?: Apollo.QueryHookOptions<VisitComentsQuery, VisitComentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VisitComentsQuery, VisitComentsQueryVariables>(VisitComentsDocument, options);
      }
export function useVisitComentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VisitComentsQuery, VisitComentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VisitComentsQuery, VisitComentsQueryVariables>(VisitComentsDocument, options);
        }
export function useVisitComentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VisitComentsQuery, VisitComentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VisitComentsQuery, VisitComentsQueryVariables>(VisitComentsDocument, options);
        }
export type VisitComentsQueryHookResult = ReturnType<typeof useVisitComentsQuery>;
export type VisitComentsLazyQueryHookResult = ReturnType<typeof useVisitComentsLazyQuery>;
export type VisitComentsSuspenseQueryHookResult = ReturnType<typeof useVisitComentsSuspenseQuery>;
export type VisitComentsQueryResult = Apollo.QueryResult<VisitComentsQuery, VisitComentsQueryVariables>;
export const ClientContactsDocument = gql`
    query ClientContacts($orderBy: [FindClientContactOrderBy!], $pagination: Pagination, $where: FindClientContactWhere) {
  clientContacts(orderBy: $orderBy, pagination: $pagination, where: $where) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    celular
    email
    position
    telefono
    client {
      id
      name
      numberDocument
      telefono
      type
      email
    }
  }
  clientContactsCount(orderBy: $orderBy, pagination: $pagination, where: $where) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useClientContactsQuery__
 *
 * To run a query within a React component, call `useClientContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientContactsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      pagination: // value for 'pagination'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useClientContactsQuery(baseOptions?: Apollo.QueryHookOptions<ClientContactsQuery, ClientContactsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientContactsQuery, ClientContactsQueryVariables>(ClientContactsDocument, options);
      }
export function useClientContactsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientContactsQuery, ClientContactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientContactsQuery, ClientContactsQueryVariables>(ClientContactsDocument, options);
        }
export function useClientContactsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ClientContactsQuery, ClientContactsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ClientContactsQuery, ClientContactsQueryVariables>(ClientContactsDocument, options);
        }
export type ClientContactsQueryHookResult = ReturnType<typeof useClientContactsQuery>;
export type ClientContactsLazyQueryHookResult = ReturnType<typeof useClientContactsLazyQuery>;
export type ClientContactsSuspenseQueryHookResult = ReturnType<typeof useClientContactsSuspenseQuery>;
export type ClientContactsQueryResult = Apollo.QueryResult<ClientContactsQuery, ClientContactsQueryVariables>;
export const ClientsOptionsDocument = gql`
    query ClientsOptions {
  clients {
    id
    name
  }
}
    `;

/**
 * __useClientsOptionsQuery__
 *
 * To run a query within a React component, call `useClientsOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientsOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientsOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useClientsOptionsQuery(baseOptions?: Apollo.QueryHookOptions<ClientsOptionsQuery, ClientsOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientsOptionsQuery, ClientsOptionsQueryVariables>(ClientsOptionsDocument, options);
      }
export function useClientsOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientsOptionsQuery, ClientsOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientsOptionsQuery, ClientsOptionsQueryVariables>(ClientsOptionsDocument, options);
        }
export function useClientsOptionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ClientsOptionsQuery, ClientsOptionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ClientsOptionsQuery, ClientsOptionsQueryVariables>(ClientsOptionsDocument, options);
        }
export type ClientsOptionsQueryHookResult = ReturnType<typeof useClientsOptionsQuery>;
export type ClientsOptionsLazyQueryHookResult = ReturnType<typeof useClientsOptionsLazyQuery>;
export type ClientsOptionsSuspenseQueryHookResult = ReturnType<typeof useClientsOptionsSuspenseQuery>;
export type ClientsOptionsQueryResult = Apollo.QueryResult<ClientsOptionsQuery, ClientsOptionsQueryVariables>;
export const PositionsDocument = gql`
    query Positions {
  positions {
    id
    name
  }
}
    `;

/**
 * __usePositionsQuery__
 *
 * To run a query within a React component, call `usePositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePositionsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePositionsQuery(baseOptions?: Apollo.QueryHookOptions<PositionsQuery, PositionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PositionsQuery, PositionsQueryVariables>(PositionsDocument, options);
      }
export function usePositionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PositionsQuery, PositionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PositionsQuery, PositionsQueryVariables>(PositionsDocument, options);
        }
export function usePositionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PositionsQuery, PositionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PositionsQuery, PositionsQueryVariables>(PositionsDocument, options);
        }
export type PositionsQueryHookResult = ReturnType<typeof usePositionsQuery>;
export type PositionsLazyQueryHookResult = ReturnType<typeof usePositionsLazyQuery>;
export type PositionsSuspenseQueryHookResult = ReturnType<typeof usePositionsSuspenseQuery>;
export type PositionsQueryResult = Apollo.QueryResult<PositionsQuery, PositionsQueryVariables>;
export const RemoveClientContactDocument = gql`
    mutation RemoveClientContact($removeClientContactId: ID!) {
  removeClientContact(id: $removeClientContactId) {
    id
    name
  }
}
    `;
export type RemoveClientContactMutationFn = Apollo.MutationFunction<RemoveClientContactMutation, RemoveClientContactMutationVariables>;

/**
 * __useRemoveClientContactMutation__
 *
 * To run a mutation, you first call `useRemoveClientContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveClientContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeClientContactMutation, { data, loading, error }] = useRemoveClientContactMutation({
 *   variables: {
 *      removeClientContactId: // value for 'removeClientContactId'
 *   },
 * });
 */
export function useRemoveClientContactMutation(baseOptions?: Apollo.MutationHookOptions<RemoveClientContactMutation, RemoveClientContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveClientContactMutation, RemoveClientContactMutationVariables>(RemoveClientContactDocument, options);
      }
export type RemoveClientContactMutationHookResult = ReturnType<typeof useRemoveClientContactMutation>;
export type RemoveClientContactMutationResult = Apollo.MutationResult<RemoveClientContactMutation>;
export type RemoveClientContactMutationOptions = Apollo.BaseMutationOptions<RemoveClientContactMutation, RemoveClientContactMutationVariables>;
export const UpdateClientContactDocument = gql`
    mutation UpdateClientContact($updateInput: UpdateClientContactInput!) {
  updateClientContact(updateInput: $updateInput) {
    id
    name
  }
}
    `;
export type UpdateClientContactMutationFn = Apollo.MutationFunction<UpdateClientContactMutation, UpdateClientContactMutationVariables>;

/**
 * __useUpdateClientContactMutation__
 *
 * To run a mutation, you first call `useUpdateClientContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientContactMutation, { data, loading, error }] = useUpdateClientContactMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateClientContactMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientContactMutation, UpdateClientContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClientContactMutation, UpdateClientContactMutationVariables>(UpdateClientContactDocument, options);
      }
export type UpdateClientContactMutationHookResult = ReturnType<typeof useUpdateClientContactMutation>;
export type UpdateClientContactMutationResult = Apollo.MutationResult<UpdateClientContactMutation>;
export type UpdateClientContactMutationOptions = Apollo.BaseMutationOptions<UpdateClientContactMutation, UpdateClientContactMutationVariables>;
export const CreateClientContactDocument = gql`
    mutation CreateClientContact($createInput: CreateClientContactInput!) {
  createClientContact(createInput: $createInput) {
    id
    name
  }
}
    `;
export type CreateClientContactMutationFn = Apollo.MutationFunction<CreateClientContactMutation, CreateClientContactMutationVariables>;

/**
 * __useCreateClientContactMutation__
 *
 * To run a mutation, you first call `useCreateClientContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientContactMutation, { data, loading, error }] = useCreateClientContactMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateClientContactMutation(baseOptions?: Apollo.MutationHookOptions<CreateClientContactMutation, CreateClientContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClientContactMutation, CreateClientContactMutationVariables>(CreateClientContactDocument, options);
      }
export type CreateClientContactMutationHookResult = ReturnType<typeof useCreateClientContactMutation>;
export type CreateClientContactMutationResult = Apollo.MutationResult<CreateClientContactMutation>;
export type CreateClientContactMutationOptions = Apollo.BaseMutationOptions<CreateClientContactMutation, CreateClientContactMutationVariables>;
export const CotizacionesDocument = gql`
    query Cotizaciones($orderBy: [FindCotizacionOrderBy!], $where: FindCotizacionWhere, $pagination: Pagination) {
  cotizaciones(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    numeroCotizacion
    fecha
    nombreCliente
    nombreVendedor
    vendedor
    ciudadCliente
    emailCliente
    nitCliente
    valor
  }
  cotizacionesCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useCotizacionesQuery__
 *
 * To run a query within a React component, call `useCotizacionesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCotizacionesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCotizacionesQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useCotizacionesQuery(baseOptions?: Apollo.QueryHookOptions<CotizacionesQuery, CotizacionesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CotizacionesQuery, CotizacionesQueryVariables>(CotizacionesDocument, options);
      }
export function useCotizacionesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CotizacionesQuery, CotizacionesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CotizacionesQuery, CotizacionesQueryVariables>(CotizacionesDocument, options);
        }
export function useCotizacionesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CotizacionesQuery, CotizacionesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CotizacionesQuery, CotizacionesQueryVariables>(CotizacionesDocument, options);
        }
export type CotizacionesQueryHookResult = ReturnType<typeof useCotizacionesQuery>;
export type CotizacionesLazyQueryHookResult = ReturnType<typeof useCotizacionesLazyQuery>;
export type CotizacionesSuspenseQueryHookResult = ReturnType<typeof useCotizacionesSuspenseQuery>;
export type CotizacionesQueryResult = Apollo.QueryResult<CotizacionesQuery, CotizacionesQueryVariables>;
export const FindSeachCotizacionDocument = gql`
    query findSeachCotizacion($cotizacionSeachInput: CotizacionSeachInput!) {
  findSeachCotizacion(cotizacionSeachInput: $cotizacionSeachInput)
}
    `;

/**
 * __useFindSeachCotizacionQuery__
 *
 * To run a query within a React component, call `useFindSeachCotizacionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSeachCotizacionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSeachCotizacionQuery({
 *   variables: {
 *      cotizacionSeachInput: // value for 'cotizacionSeachInput'
 *   },
 * });
 */
export function useFindSeachCotizacionQuery(baseOptions: Apollo.QueryHookOptions<FindSeachCotizacionQuery, FindSeachCotizacionQueryVariables> & ({ variables: FindSeachCotizacionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSeachCotizacionQuery, FindSeachCotizacionQueryVariables>(FindSeachCotizacionDocument, options);
      }
export function useFindSeachCotizacionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSeachCotizacionQuery, FindSeachCotizacionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSeachCotizacionQuery, FindSeachCotizacionQueryVariables>(FindSeachCotizacionDocument, options);
        }
export function useFindSeachCotizacionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindSeachCotizacionQuery, FindSeachCotizacionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindSeachCotizacionQuery, FindSeachCotizacionQueryVariables>(FindSeachCotizacionDocument, options);
        }
export type FindSeachCotizacionQueryHookResult = ReturnType<typeof useFindSeachCotizacionQuery>;
export type FindSeachCotizacionLazyQueryHookResult = ReturnType<typeof useFindSeachCotizacionLazyQuery>;
export type FindSeachCotizacionSuspenseQueryHookResult = ReturnType<typeof useFindSeachCotizacionSuspenseQuery>;
export type FindSeachCotizacionQueryResult = Apollo.QueryResult<FindSeachCotizacionQuery, FindSeachCotizacionQueryVariables>;
export const CotizacionDocument = gql`
    query Cotizacion($cotizacionId: ID!) {
  cotizacion(id: $cotizacionId) {
    id
    createdAt
    updatedAt
    deletedAt
    numeroCotizacion
    fecha
    nombreCliente
    nombreVendedor
    vendedor
    ciudadCliente
    emailCliente
    nitCliente
    valor
    descripcion
    status
    proyecto {
      name
      status
      description
      value
      id
    }
    detalle {
      id
      createdAt
      updatedAt
      deletedAt
      referencia
      descripcion
      unidadMedida
      cantidad
      valorCosto
      valorVenta
      total
      uuid
    }
  }
}
    `;

/**
 * __useCotizacionQuery__
 *
 * To run a query within a React component, call `useCotizacionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCotizacionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCotizacionQuery({
 *   variables: {
 *      cotizacionId: // value for 'cotizacionId'
 *   },
 * });
 */
export function useCotizacionQuery(baseOptions: Apollo.QueryHookOptions<CotizacionQuery, CotizacionQueryVariables> & ({ variables: CotizacionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CotizacionQuery, CotizacionQueryVariables>(CotizacionDocument, options);
      }
export function useCotizacionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CotizacionQuery, CotizacionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CotizacionQuery, CotizacionQueryVariables>(CotizacionDocument, options);
        }
export function useCotizacionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CotizacionQuery, CotizacionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CotizacionQuery, CotizacionQueryVariables>(CotizacionDocument, options);
        }
export type CotizacionQueryHookResult = ReturnType<typeof useCotizacionQuery>;
export type CotizacionLazyQueryHookResult = ReturnType<typeof useCotizacionLazyQuery>;
export type CotizacionSuspenseQueryHookResult = ReturnType<typeof useCotizacionSuspenseQuery>;
export type CotizacionQueryResult = Apollo.QueryResult<CotizacionQuery, CotizacionQueryVariables>;
export const SaveDetalleCotizacionDocument = gql`
    mutation SaveDetalleCotizacion($saveDetalleCotizacionId: String!) {
  saveDetalleCotizacion(id: $saveDetalleCotizacionId)
}
    `;
export type SaveDetalleCotizacionMutationFn = Apollo.MutationFunction<SaveDetalleCotizacionMutation, SaveDetalleCotizacionMutationVariables>;

/**
 * __useSaveDetalleCotizacionMutation__
 *
 * To run a mutation, you first call `useSaveDetalleCotizacionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveDetalleCotizacionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveDetalleCotizacionMutation, { data, loading, error }] = useSaveDetalleCotizacionMutation({
 *   variables: {
 *      saveDetalleCotizacionId: // value for 'saveDetalleCotizacionId'
 *   },
 * });
 */
export function useSaveDetalleCotizacionMutation(baseOptions?: Apollo.MutationHookOptions<SaveDetalleCotizacionMutation, SaveDetalleCotizacionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveDetalleCotizacionMutation, SaveDetalleCotizacionMutationVariables>(SaveDetalleCotizacionDocument, options);
      }
export type SaveDetalleCotizacionMutationHookResult = ReturnType<typeof useSaveDetalleCotizacionMutation>;
export type SaveDetalleCotizacionMutationResult = Apollo.MutationResult<SaveDetalleCotizacionMutation>;
export type SaveDetalleCotizacionMutationOptions = Apollo.BaseMutationOptions<SaveDetalleCotizacionMutation, SaveDetalleCotizacionMutationVariables>;
export const UpdateCotizacionDocument = gql`
    mutation UpdateCotizacion($updateInput: UpdateCotizacionInput!) {
  updateCotizacion(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateCotizacionMutationFn = Apollo.MutationFunction<UpdateCotizacionMutation, UpdateCotizacionMutationVariables>;

/**
 * __useUpdateCotizacionMutation__
 *
 * To run a mutation, you first call `useUpdateCotizacionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCotizacionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCotizacionMutation, { data, loading, error }] = useUpdateCotizacionMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateCotizacionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCotizacionMutation, UpdateCotizacionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCotizacionMutation, UpdateCotizacionMutationVariables>(UpdateCotizacionDocument, options);
      }
export type UpdateCotizacionMutationHookResult = ReturnType<typeof useUpdateCotizacionMutation>;
export type UpdateCotizacionMutationResult = Apollo.MutationResult<UpdateCotizacionMutation>;
export type UpdateCotizacionMutationOptions = Apollo.BaseMutationOptions<UpdateCotizacionMutation, UpdateCotizacionMutationVariables>;
export const UpdateDetalleCotizacionDocument = gql`
    mutation UpdateDetalleCotizacion($updateInput: UpdateCotizacionDetalleInput!) {
  updateDetalleCotizacion(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateDetalleCotizacionMutationFn = Apollo.MutationFunction<UpdateDetalleCotizacionMutation, UpdateDetalleCotizacionMutationVariables>;

/**
 * __useUpdateDetalleCotizacionMutation__
 *
 * To run a mutation, you first call `useUpdateDetalleCotizacionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDetalleCotizacionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDetalleCotizacionMutation, { data, loading, error }] = useUpdateDetalleCotizacionMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateDetalleCotizacionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDetalleCotizacionMutation, UpdateDetalleCotizacionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDetalleCotizacionMutation, UpdateDetalleCotizacionMutationVariables>(UpdateDetalleCotizacionDocument, options);
      }
export type UpdateDetalleCotizacionMutationHookResult = ReturnType<typeof useUpdateDetalleCotizacionMutation>;
export type UpdateDetalleCotizacionMutationResult = Apollo.MutationResult<UpdateDetalleCotizacionMutation>;
export type UpdateDetalleCotizacionMutationOptions = Apollo.BaseMutationOptions<UpdateDetalleCotizacionMutation, UpdateDetalleCotizacionMutationVariables>;
export const FindAllFacturaClienteDocument = gql`
    query FindAllFacturaCliente($input: FacturaPorClienteDto!) {
  findAllFacturaCliente(input: $input) {
    numberDocument
    description
    valueFlete
    oip
    backComision
    numberGuia
    carrier
    carrierCell
    contactClient
    TEM_CEDULA
    TEM_NOMCLI
    TEM_FECHA
    TEM_TIPMOV
    TEM_PREFIJ
    TEM_NUMDOC
    TEM_VENDED
    TEM_VENTA
    TEM_VALCOS
    TEM_UTILIDAD
    TEM_PORCENTAJE_UTILIDAD
    CL_DEPART
    CLI_CIUDAD
  }
}
    `;

/**
 * __useFindAllFacturaClienteQuery__
 *
 * To run a query within a React component, call `useFindAllFacturaClienteQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllFacturaClienteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllFacturaClienteQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindAllFacturaClienteQuery(baseOptions: Apollo.QueryHookOptions<FindAllFacturaClienteQuery, FindAllFacturaClienteQueryVariables> & ({ variables: FindAllFacturaClienteQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllFacturaClienteQuery, FindAllFacturaClienteQueryVariables>(FindAllFacturaClienteDocument, options);
      }
export function useFindAllFacturaClienteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllFacturaClienteQuery, FindAllFacturaClienteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllFacturaClienteQuery, FindAllFacturaClienteQueryVariables>(FindAllFacturaClienteDocument, options);
        }
export function useFindAllFacturaClienteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllFacturaClienteQuery, FindAllFacturaClienteQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllFacturaClienteQuery, FindAllFacturaClienteQueryVariables>(FindAllFacturaClienteDocument, options);
        }
export type FindAllFacturaClienteQueryHookResult = ReturnType<typeof useFindAllFacturaClienteQuery>;
export type FindAllFacturaClienteLazyQueryHookResult = ReturnType<typeof useFindAllFacturaClienteLazyQuery>;
export type FindAllFacturaClienteSuspenseQueryHookResult = ReturnType<typeof useFindAllFacturaClienteSuspenseQuery>;
export type FindAllFacturaClienteQueryResult = Apollo.QueryResult<FindAllFacturaClienteQuery, FindAllFacturaClienteQueryVariables>;
export const FindOneFacturaClienteByCodeDocument = gql`
    query FindOneFacturaClienteByCode($code: String!) {
  findOneFacturaClienteByCode(code: $code) {
    isFound
    flete {
      id
      createdAt
      updatedAt
      deletedAt
      numberDocument
      description
      valueFlete
      oip
      backComision
      numberGuia
      carrier
      carrierCell
      contactClient
    }
  }
}
    `;

/**
 * __useFindOneFacturaClienteByCodeQuery__
 *
 * To run a query within a React component, call `useFindOneFacturaClienteByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneFacturaClienteByCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneFacturaClienteByCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useFindOneFacturaClienteByCodeQuery(baseOptions: Apollo.QueryHookOptions<FindOneFacturaClienteByCodeQuery, FindOneFacturaClienteByCodeQueryVariables> & ({ variables: FindOneFacturaClienteByCodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneFacturaClienteByCodeQuery, FindOneFacturaClienteByCodeQueryVariables>(FindOneFacturaClienteByCodeDocument, options);
      }
export function useFindOneFacturaClienteByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneFacturaClienteByCodeQuery, FindOneFacturaClienteByCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneFacturaClienteByCodeQuery, FindOneFacturaClienteByCodeQueryVariables>(FindOneFacturaClienteByCodeDocument, options);
        }
export function useFindOneFacturaClienteByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindOneFacturaClienteByCodeQuery, FindOneFacturaClienteByCodeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindOneFacturaClienteByCodeQuery, FindOneFacturaClienteByCodeQueryVariables>(FindOneFacturaClienteByCodeDocument, options);
        }
export type FindOneFacturaClienteByCodeQueryHookResult = ReturnType<typeof useFindOneFacturaClienteByCodeQuery>;
export type FindOneFacturaClienteByCodeLazyQueryHookResult = ReturnType<typeof useFindOneFacturaClienteByCodeLazyQuery>;
export type FindOneFacturaClienteByCodeSuspenseQueryHookResult = ReturnType<typeof useFindOneFacturaClienteByCodeSuspenseQuery>;
export type FindOneFacturaClienteByCodeQueryResult = Apollo.QueryResult<FindOneFacturaClienteByCodeQuery, FindOneFacturaClienteByCodeQueryVariables>;
export const CreateFletesDocument = gql`
    mutation CreateFletes($createInput: CreateFletesInput!) {
  createFletes(createInput: $createInput) {
    id
  }
}
    `;
export type CreateFletesMutationFn = Apollo.MutationFunction<CreateFletesMutation, CreateFletesMutationVariables>;

/**
 * __useCreateFletesMutation__
 *
 * To run a mutation, you first call `useCreateFletesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFletesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFletesMutation, { data, loading, error }] = useCreateFletesMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateFletesMutation(baseOptions?: Apollo.MutationHookOptions<CreateFletesMutation, CreateFletesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFletesMutation, CreateFletesMutationVariables>(CreateFletesDocument, options);
      }
export type CreateFletesMutationHookResult = ReturnType<typeof useCreateFletesMutation>;
export type CreateFletesMutationResult = Apollo.MutationResult<CreateFletesMutation>;
export type CreateFletesMutationOptions = Apollo.BaseMutationOptions<CreateFletesMutation, CreateFletesMutationVariables>;
export const UpdateFletesDocument = gql`
    mutation UpdateFletes($updateInput: UpdateFletesInput!) {
  updateFletes(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateFletesMutationFn = Apollo.MutationFunction<UpdateFletesMutation, UpdateFletesMutationVariables>;

/**
 * __useUpdateFletesMutation__
 *
 * To run a mutation, you first call `useUpdateFletesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFletesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFletesMutation, { data, loading, error }] = useUpdateFletesMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateFletesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFletesMutation, UpdateFletesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFletesMutation, UpdateFletesMutationVariables>(UpdateFletesDocument, options);
      }
export type UpdateFletesMutationHookResult = ReturnType<typeof useUpdateFletesMutation>;
export type UpdateFletesMutationResult = Apollo.MutationResult<UpdateFletesMutation>;
export type UpdateFletesMutationOptions = Apollo.BaseMutationOptions<UpdateFletesMutation, UpdateFletesMutationVariables>;
export const FindUtilidadRealDocument = gql`
    query FindUtilidadReal($input: findUtilidadRealInput!) {
  findUtilidadReal(input: $input) {
    trabajadores {
      number_document
      nombre
      venta
      costo
      flete
      comision
      oip
      utilidadReal
      utilidadPorcentaje
      utilidad
      porcentaje
      totalVendido
      presupuesto
    }
    grupo {
      utilidad
      utilidad_porcentaje
    }
  }
}
    `;

/**
 * __useFindUtilidadRealQuery__
 *
 * To run a query within a React component, call `useFindUtilidadRealQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUtilidadRealQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUtilidadRealQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindUtilidadRealQuery(baseOptions: Apollo.QueryHookOptions<FindUtilidadRealQuery, FindUtilidadRealQueryVariables> & ({ variables: FindUtilidadRealQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUtilidadRealQuery, FindUtilidadRealQueryVariables>(FindUtilidadRealDocument, options);
      }
export function useFindUtilidadRealLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUtilidadRealQuery, FindUtilidadRealQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUtilidadRealQuery, FindUtilidadRealQueryVariables>(FindUtilidadRealDocument, options);
        }
export function useFindUtilidadRealSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindUtilidadRealQuery, FindUtilidadRealQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindUtilidadRealQuery, FindUtilidadRealQueryVariables>(FindUtilidadRealDocument, options);
        }
export type FindUtilidadRealQueryHookResult = ReturnType<typeof useFindUtilidadRealQuery>;
export type FindUtilidadRealLazyQueryHookResult = ReturnType<typeof useFindUtilidadRealLazyQuery>;
export type FindUtilidadRealSuspenseQueryHookResult = ReturnType<typeof useFindUtilidadRealSuspenseQuery>;
export type FindUtilidadRealQueryResult = Apollo.QueryResult<FindUtilidadRealQuery, FindUtilidadRealQueryVariables>;
export const DepartmentsDocument = gql`
    query Departments {
  departments {
    id
    createdAt
    updatedAt
    deletedAt
    code
    name
  }
}
    `;

/**
 * __useDepartmentsQuery__
 *
 * To run a query within a React component, call `useDepartmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDepartmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDepartmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDepartmentsQuery(baseOptions?: Apollo.QueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DepartmentsQuery, DepartmentsQueryVariables>(DepartmentsDocument, options);
      }
export function useDepartmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DepartmentsQuery, DepartmentsQueryVariables>(DepartmentsDocument, options);
        }
export function useDepartmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DepartmentsQuery, DepartmentsQueryVariables>(DepartmentsDocument, options);
        }
export type DepartmentsQueryHookResult = ReturnType<typeof useDepartmentsQuery>;
export type DepartmentsLazyQueryHookResult = ReturnType<typeof useDepartmentsLazyQuery>;
export type DepartmentsSuspenseQueryHookResult = ReturnType<typeof useDepartmentsSuspenseQuery>;
export type DepartmentsQueryResult = Apollo.QueryResult<DepartmentsQuery, DepartmentsQueryVariables>;
export const CitiesDocument = gql`
    query Cities($departmentId: ID) {
  cities(departmentId: $departmentId) {
    id
    createdAt
    updatedAt
    deletedAt
    code
    name
    department {
      code
      createdAt
      deletedAt
      id
      name
      updatedAt
    }
  }
}
    `;

/**
 * __useCitiesQuery__
 *
 * To run a query within a React component, call `useCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCitiesQuery({
 *   variables: {
 *      departmentId: // value for 'departmentId'
 *   },
 * });
 */
export function useCitiesQuery(baseOptions?: Apollo.QueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
      }
export function useCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
        }
export function useCitiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
        }
export type CitiesQueryHookResult = ReturnType<typeof useCitiesQuery>;
export type CitiesLazyQueryHookResult = ReturnType<typeof useCitiesLazyQuery>;
export type CitiesSuspenseQueryHookResult = ReturnType<typeof useCitiesSuspenseQuery>;
export type CitiesQueryResult = Apollo.QueryResult<CitiesQuery, CitiesQueryVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($password: String!) {
  resetPassword(password: $password) {
    email
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SendEmailRecovryPasswordDocument = gql`
    query sendEmailRecovryPassword($email: String!) {
  sendEmailRecovryPassword(email: $email)
}
    `;

/**
 * __useSendEmailRecovryPasswordQuery__
 *
 * To run a query within a React component, call `useSendEmailRecovryPasswordQuery` and pass it any options that fit your needs.
 * When your component renders, `useSendEmailRecovryPasswordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSendEmailRecovryPasswordQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendEmailRecovryPasswordQuery(baseOptions: Apollo.QueryHookOptions<SendEmailRecovryPasswordQuery, SendEmailRecovryPasswordQueryVariables> & ({ variables: SendEmailRecovryPasswordQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SendEmailRecovryPasswordQuery, SendEmailRecovryPasswordQueryVariables>(SendEmailRecovryPasswordDocument, options);
      }
export function useSendEmailRecovryPasswordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SendEmailRecovryPasswordQuery, SendEmailRecovryPasswordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SendEmailRecovryPasswordQuery, SendEmailRecovryPasswordQueryVariables>(SendEmailRecovryPasswordDocument, options);
        }
export function useSendEmailRecovryPasswordSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SendEmailRecovryPasswordQuery, SendEmailRecovryPasswordQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SendEmailRecovryPasswordQuery, SendEmailRecovryPasswordQueryVariables>(SendEmailRecovryPasswordDocument, options);
        }
export type SendEmailRecovryPasswordQueryHookResult = ReturnType<typeof useSendEmailRecovryPasswordQuery>;
export type SendEmailRecovryPasswordLazyQueryHookResult = ReturnType<typeof useSendEmailRecovryPasswordLazyQuery>;
export type SendEmailRecovryPasswordSuspenseQueryHookResult = ReturnType<typeof useSendEmailRecovryPasswordSuspenseQuery>;
export type SendEmailRecovryPasswordQueryResult = Apollo.QueryResult<SendEmailRecovryPasswordQuery, SendEmailRecovryPasswordQueryVariables>;
export const ParametersDocument = gql`
    query Parameters($pagination: Pagination) {
  parameters(pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    codigo
    descripcion
    type
    valueInt
    valueString
    valueDate
    valueFile {
      id
      url
      fileMongoId
      createdAt
      updatedAt
      deletedAt
      fileName
      fileExtension
      fileMode
    }
  }
  parametersCount(pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useParametersQuery__
 *
 * To run a query within a React component, call `useParametersQuery` and pass it any options that fit your needs.
 * When your component renders, `useParametersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParametersQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useParametersQuery(baseOptions?: Apollo.QueryHookOptions<ParametersQuery, ParametersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ParametersQuery, ParametersQueryVariables>(ParametersDocument, options);
      }
export function useParametersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParametersQuery, ParametersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ParametersQuery, ParametersQueryVariables>(ParametersDocument, options);
        }
export function useParametersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ParametersQuery, ParametersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ParametersQuery, ParametersQueryVariables>(ParametersDocument, options);
        }
export type ParametersQueryHookResult = ReturnType<typeof useParametersQuery>;
export type ParametersLazyQueryHookResult = ReturnType<typeof useParametersLazyQuery>;
export type ParametersSuspenseQueryHookResult = ReturnType<typeof useParametersSuspenseQuery>;
export type ParametersQueryResult = Apollo.QueryResult<ParametersQuery, ParametersQueryVariables>;
export const RemoveParameterDocument = gql`
    mutation RemoveParameter($removeParameterId: ID!) {
  removeParameter(id: $removeParameterId) {
    id
    name
    type
    descripcion
  }
}
    `;
export type RemoveParameterMutationFn = Apollo.MutationFunction<RemoveParameterMutation, RemoveParameterMutationVariables>;

/**
 * __useRemoveParameterMutation__
 *
 * To run a mutation, you first call `useRemoveParameterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveParameterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeParameterMutation, { data, loading, error }] = useRemoveParameterMutation({
 *   variables: {
 *      removeParameterId: // value for 'removeParameterId'
 *   },
 * });
 */
export function useRemoveParameterMutation(baseOptions?: Apollo.MutationHookOptions<RemoveParameterMutation, RemoveParameterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveParameterMutation, RemoveParameterMutationVariables>(RemoveParameterDocument, options);
      }
export type RemoveParameterMutationHookResult = ReturnType<typeof useRemoveParameterMutation>;
export type RemoveParameterMutationResult = Apollo.MutationResult<RemoveParameterMutation>;
export type RemoveParameterMutationOptions = Apollo.BaseMutationOptions<RemoveParameterMutation, RemoveParameterMutationVariables>;
export const UpdateParameterDocument = gql`
    mutation UpdateParameter($updateInput: UpdateParametersInput!) {
  updateParameter(updateInput: $updateInput) {
    id
    name
    descripcion
  }
}
    `;
export type UpdateParameterMutationFn = Apollo.MutationFunction<UpdateParameterMutation, UpdateParameterMutationVariables>;

/**
 * __useUpdateParameterMutation__
 *
 * To run a mutation, you first call `useUpdateParameterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateParameterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateParameterMutation, { data, loading, error }] = useUpdateParameterMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateParameterMutation(baseOptions?: Apollo.MutationHookOptions<UpdateParameterMutation, UpdateParameterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateParameterMutation, UpdateParameterMutationVariables>(UpdateParameterDocument, options);
      }
export type UpdateParameterMutationHookResult = ReturnType<typeof useUpdateParameterMutation>;
export type UpdateParameterMutationResult = Apollo.MutationResult<UpdateParameterMutation>;
export type UpdateParameterMutationOptions = Apollo.BaseMutationOptions<UpdateParameterMutation, UpdateParameterMutationVariables>;
export const CreateParameterDocument = gql`
    mutation CreateParameter($createInput: CreateParametersInput!) {
  createParameter(createInput: $createInput) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    codigo
    descripcion
    type
    valueInt
    valueString
    valueDate
    valueFile {
      id
      createdAt
      updatedAt
      deletedAt
      fileName
      fileExtension
      fileMode
      fileMongoId
      url
    }
  }
}
    `;
export type CreateParameterMutationFn = Apollo.MutationFunction<CreateParameterMutation, CreateParameterMutationVariables>;

/**
 * __useCreateParameterMutation__
 *
 * To run a mutation, you first call `useCreateParameterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateParameterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createParameterMutation, { data, loading, error }] = useCreateParameterMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateParameterMutation(baseOptions?: Apollo.MutationHookOptions<CreateParameterMutation, CreateParameterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateParameterMutation, CreateParameterMutationVariables>(CreateParameterDocument, options);
      }
export type CreateParameterMutationHookResult = ReturnType<typeof useCreateParameterMutation>;
export type CreateParameterMutationResult = Apollo.MutationResult<CreateParameterMutation>;
export type CreateParameterMutationOptions = Apollo.BaseMutationOptions<CreateParameterMutation, CreateParameterMutationVariables>;
export const CrearConceptoDocument = gql`
    mutation CrearConcepto($data: CrearConceptoDto!) {
  crearConcepto(data: $data) {
    id
    nombre
    esSuma
    editable
    valores
  }
}
    `;
export type CrearConceptoMutationFn = Apollo.MutationFunction<CrearConceptoMutation, CrearConceptoMutationVariables>;

/**
 * __useCrearConceptoMutation__
 *
 * To run a mutation, you first call `useCrearConceptoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCrearConceptoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [crearConceptoMutation, { data, loading, error }] = useCrearConceptoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCrearConceptoMutation(baseOptions?: Apollo.MutationHookOptions<CrearConceptoMutation, CrearConceptoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CrearConceptoMutation, CrearConceptoMutationVariables>(CrearConceptoDocument, options);
      }
export type CrearConceptoMutationHookResult = ReturnType<typeof useCrearConceptoMutation>;
export type CrearConceptoMutationResult = Apollo.MutationResult<CrearConceptoMutation>;
export type CrearConceptoMutationOptions = Apollo.BaseMutationOptions<CrearConceptoMutation, CrearConceptoMutationVariables>;
export const UpdateConceptoDocument = gql`
    mutation UpdateConcepto($actualizarConceptoDto: ActualizarConceptoDto!) {
  updateConcepto(actualizarConceptoDto: $actualizarConceptoDto) {
    id
    nombre
    esSuma
    editable
    valores
  }
}
    `;
export type UpdateConceptoMutationFn = Apollo.MutationFunction<UpdateConceptoMutation, UpdateConceptoMutationVariables>;

/**
 * __useUpdateConceptoMutation__
 *
 * To run a mutation, you first call `useUpdateConceptoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateConceptoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateConceptoMutation, { data, loading, error }] = useUpdateConceptoMutation({
 *   variables: {
 *      actualizarConceptoDto: // value for 'actualizarConceptoDto'
 *   },
 * });
 */
export function useUpdateConceptoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateConceptoMutation, UpdateConceptoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateConceptoMutation, UpdateConceptoMutationVariables>(UpdateConceptoDocument, options);
      }
export type UpdateConceptoMutationHookResult = ReturnType<typeof useUpdateConceptoMutation>;
export type UpdateConceptoMutationResult = Apollo.MutationResult<UpdateConceptoMutation>;
export type UpdateConceptoMutationOptions = Apollo.BaseMutationOptions<UpdateConceptoMutation, UpdateConceptoMutationVariables>;
export const EliminarConceptoDocument = gql`
    mutation EliminarConcepto($eliminarConceptoDto: String!) {
  eliminarConcepto(eliminarConceptoDto: $eliminarConceptoDto)
}
    `;
export type EliminarConceptoMutationFn = Apollo.MutationFunction<EliminarConceptoMutation, EliminarConceptoMutationVariables>;

/**
 * __useEliminarConceptoMutation__
 *
 * To run a mutation, you first call `useEliminarConceptoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEliminarConceptoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [eliminarConceptoMutation, { data, loading, error }] = useEliminarConceptoMutation({
 *   variables: {
 *      eliminarConceptoDto: // value for 'eliminarConceptoDto'
 *   },
 * });
 */
export function useEliminarConceptoMutation(baseOptions?: Apollo.MutationHookOptions<EliminarConceptoMutation, EliminarConceptoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EliminarConceptoMutation, EliminarConceptoMutationVariables>(EliminarConceptoDocument, options);
      }
export type EliminarConceptoMutationHookResult = ReturnType<typeof useEliminarConceptoMutation>;
export type EliminarConceptoMutationResult = Apollo.MutationResult<EliminarConceptoMutation>;
export type EliminarConceptoMutationOptions = Apollo.BaseMutationOptions<EliminarConceptoMutation, EliminarConceptoMutationVariables>;
export const CreateProyectoDocument = gql`
    mutation CreateProyecto($createInput: CreateProyectosInput!) {
  createProyecto(createInput: $createInput) {
    id
  }
}
    `;
export type CreateProyectoMutationFn = Apollo.MutationFunction<CreateProyectoMutation, CreateProyectoMutationVariables>;

/**
 * __useCreateProyectoMutation__
 *
 * To run a mutation, you first call `useCreateProyectoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProyectoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProyectoMutation, { data, loading, error }] = useCreateProyectoMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateProyectoMutation(baseOptions?: Apollo.MutationHookOptions<CreateProyectoMutation, CreateProyectoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProyectoMutation, CreateProyectoMutationVariables>(CreateProyectoDocument, options);
      }
export type CreateProyectoMutationHookResult = ReturnType<typeof useCreateProyectoMutation>;
export type CreateProyectoMutationResult = Apollo.MutationResult<CreateProyectoMutation>;
export type CreateProyectoMutationOptions = Apollo.BaseMutationOptions<CreateProyectoMutation, CreateProyectoMutationVariables>;
export const ProyectosDocument = gql`
    query Proyectos($pagination: Pagination, $where: FindProyectoWhere, $orderBy: [FindProyectoOrderBy!]) {
  proyectos(pagination: $pagination, where: $where, orderBy: $orderBy) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    value
    status
    dateExpiration
    description
    clientIntegrador {
      id
      createdAt
      updatedAt
      deletedAt
      name
      numberDocument
      email
      telefono
      address
      descripcion
      type
      vertical
      celular
      department {
        id
        createdAt
        updatedAt
        deletedAt
        code
        name
      }
      country {
        id
        createdAt
        updatedAt
        deletedAt
        code
        name
      }
      user {
        id
        createdAt
        updatedAt
        deletedAt
        name
        middleName
        lastName
        secondSurname
        email
        identificationType
        identificationNumber
        dateIssue
        legalRepresentativeIdentificationType
        legalRepresentativeIdentificationNumber
        phoneCountryCode
        phoneNumber
        address
        hasRural
        confirmationCode
        position
        valueTransport
        typeWoker
        status
        phoneVerification
        emailVerification
        type
        fullName
      }
    }
    clientFinal {
      id
      createdAt
      updatedAt
      deletedAt
      name
      numberDocument
      email
      telefono
      address
      descripcion
      type
      vertical
      celular
    }
    worker {
      id
      createdAt
      updatedAt
      deletedAt
      name
      middleName
      lastName
      secondSurname
      email
      identificationType
      identificationNumber
      dateIssue
      legalRepresentativeIdentificationType
      legalRepresentativeIdentificationNumber
      phoneCountryCode
      phoneNumber
      address
      hasRural
      confirmationCode
      position
      valueTransport
      typeWoker
      status
      phoneVerification
      emailVerification
      type
      manager {
        id
        createdAt
        updatedAt
        deletedAt
        name
        middleName
        lastName
        secondSurname
        email
        identificationType
        identificationNumber
        dateIssue
        legalRepresentativeIdentificationType
        legalRepresentativeIdentificationNumber
        phoneCountryCode
        phoneNumber
        address
        hasRural
        confirmationCode
        position
        valueTransport
        typeWoker
        status
        phoneVerification
        emailVerification
        type
        fullName
      }
      subordinates {
        id
        createdAt
        updatedAt
        deletedAt
        name
        middleName
        lastName
        secondSurname
        email
        identificationType
        identificationNumber
        dateIssue
        legalRepresentativeIdentificationType
        legalRepresentativeIdentificationNumber
        phoneCountryCode
        phoneNumber
        address
        hasRural
        confirmationCode
        position
        valueTransport
        typeWoker
        status
        phoneVerification
        emailVerification
        type
        fullName
      }
      userRoles {
        id
        createdAt
        updatedAt
        deletedAt
        name
        description
        defaultForType
        users {
          id
          createdAt
          updatedAt
          deletedAt
          name
          middleName
          lastName
          secondSurname
          email
          identificationType
          identificationNumber
          dateIssue
          legalRepresentativeIdentificationType
          legalRepresentativeIdentificationNumber
          phoneCountryCode
          phoneNumber
          address
          hasRural
          confirmationCode
          position
          valueTransport
          typeWoker
          status
          phoneVerification
          emailVerification
          type
          fullName
        }
        roleFx {
          id
          createdAt
          updatedAt
          deletedAt
          permission
        }
      }
      userRolesFx {
        id
        createdAt
        updatedAt
        deletedAt
        permission
        role {
          id
          createdAt
          updatedAt
          deletedAt
          name
          description
          defaultForType
        }
      }
      fullName
    }
    createdByUser {
      id
      createdAt
      updatedAt
      deletedAt
      name
      middleName
      lastName
      secondSurname
      email
      identificationType
      identificationNumber
      dateIssue
      legalRepresentativeIdentificationType
      legalRepresentativeIdentificationNumber
      phoneCountryCode
      phoneNumber
      address
      hasRural
      confirmationCode
      position
      valueTransport
      typeWoker
      status
      phoneVerification
      emailVerification
      type
      fullName
    }
    city {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
  }
  proyectosCount(pagination: $pagination, where: $where, orderBy: $orderBy) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useProyectosQuery__
 *
 * To run a query within a React component, call `useProyectosQuery` and pass it any options that fit your needs.
 * When your component renders, `useProyectosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProyectosQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useProyectosQuery(baseOptions?: Apollo.QueryHookOptions<ProyectosQuery, ProyectosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProyectosQuery, ProyectosQueryVariables>(ProyectosDocument, options);
      }
export function useProyectosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProyectosQuery, ProyectosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProyectosQuery, ProyectosQueryVariables>(ProyectosDocument, options);
        }
export function useProyectosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProyectosQuery, ProyectosQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProyectosQuery, ProyectosQueryVariables>(ProyectosDocument, options);
        }
export type ProyectosQueryHookResult = ReturnType<typeof useProyectosQuery>;
export type ProyectosLazyQueryHookResult = ReturnType<typeof useProyectosLazyQuery>;
export type ProyectosSuspenseQueryHookResult = ReturnType<typeof useProyectosSuspenseQuery>;
export type ProyectosQueryResult = Apollo.QueryResult<ProyectosQuery, ProyectosQueryVariables>;
export const UpdateProyectoDocument = gql`
    mutation UpdateProyecto($updateInput: UpdatePryectosInput!) {
  updateProyecto(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateProyectoMutationFn = Apollo.MutationFunction<UpdateProyectoMutation, UpdateProyectoMutationVariables>;

/**
 * __useUpdateProyectoMutation__
 *
 * To run a mutation, you first call `useUpdateProyectoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProyectoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProyectoMutation, { data, loading, error }] = useUpdateProyectoMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateProyectoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProyectoMutation, UpdateProyectoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProyectoMutation, UpdateProyectoMutationVariables>(UpdateProyectoDocument, options);
      }
export type UpdateProyectoMutationHookResult = ReturnType<typeof useUpdateProyectoMutation>;
export type UpdateProyectoMutationResult = Apollo.MutationResult<UpdateProyectoMutation>;
export type UpdateProyectoMutationOptions = Apollo.BaseMutationOptions<UpdateProyectoMutation, UpdateProyectoMutationVariables>;
export const ProyectoDocument = gql`
    query Proyecto($proyectoId: ID!) {
  proyecto(id: $proyectoId) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    value
    status
    dateExpiration
    description
    clientIntegrador {
      id
      createdAt
      updatedAt
      deletedAt
      name
      numberDocument
      email
      telefono
      address
      descripcion
      type
      vertical
      celular
      department {
        id
        createdAt
        updatedAt
        deletedAt
        code
        name
      }
      country {
        id
        createdAt
        updatedAt
        deletedAt
        code
        name
      }
      user {
        id
        createdAt
        updatedAt
        deletedAt
        name
        middleName
        lastName
        secondSurname
        email
        identificationType
        identificationNumber
        dateIssue
        legalRepresentativeIdentificationType
        legalRepresentativeIdentificationNumber
        phoneCountryCode
        phoneNumber
        address
        hasRural
        confirmationCode
        position
        valueTransport
        typeWoker
        status
        phoneVerification
        emailVerification
        type
        fullName
      }
    }
    clientFinal {
      id
      createdAt
      updatedAt
      deletedAt
      name
      numberDocument
      email
      telefono
      address
      descripcion
      type
      vertical
      celular
    }
    worker {
      id
      createdAt
      updatedAt
      deletedAt
      name
      middleName
      lastName
      secondSurname
      email
      identificationType
      identificationNumber
      dateIssue
      legalRepresentativeIdentificationType
      legalRepresentativeIdentificationNumber
      phoneCountryCode
      phoneNumber
      address
      hasRural
      confirmationCode
      position
      valueTransport
      typeWoker
      status
      phoneVerification
      emailVerification
      type
      manager {
        id
        createdAt
        updatedAt
        deletedAt
        name
        middleName
        lastName
        secondSurname
        email
        identificationType
        identificationNumber
        dateIssue
        legalRepresentativeIdentificationType
        legalRepresentativeIdentificationNumber
        phoneCountryCode
        phoneNumber
        address
        hasRural
        confirmationCode
        position
        valueTransport
        typeWoker
        status
        phoneVerification
        emailVerification
        type
        fullName
      }
      subordinates {
        id
        createdAt
        updatedAt
        deletedAt
        name
        middleName
        lastName
        secondSurname
        email
        identificationType
        identificationNumber
        dateIssue
        legalRepresentativeIdentificationType
        legalRepresentativeIdentificationNumber
        phoneCountryCode
        phoneNumber
        address
        hasRural
        confirmationCode
        position
        valueTransport
        typeWoker
        status
        phoneVerification
        emailVerification
        type
        fullName
      }
      userRoles {
        id
        createdAt
        updatedAt
        deletedAt
        name
        description
        defaultForType
        users {
          id
          createdAt
          updatedAt
          deletedAt
          name
          middleName
          lastName
          secondSurname
          email
          identificationType
          identificationNumber
          dateIssue
          legalRepresentativeIdentificationType
          legalRepresentativeIdentificationNumber
          phoneCountryCode
          phoneNumber
          address
          hasRural
          confirmationCode
          position
          valueTransport
          typeWoker
          status
          phoneVerification
          emailVerification
          type
          fullName
        }
        roleFx {
          id
          createdAt
          updatedAt
          deletedAt
          permission
        }
      }
      userRolesFx {
        id
        createdAt
        updatedAt
        deletedAt
        permission
        role {
          id
          createdAt
          updatedAt
          deletedAt
          name
          description
          defaultForType
        }
      }
      fullName
    }
    createdByUser {
      id
      createdAt
      updatedAt
      deletedAt
      name
      middleName
      lastName
      secondSurname
      email
      identificationType
      identificationNumber
      dateIssue
      legalRepresentativeIdentificationType
      legalRepresentativeIdentificationNumber
      phoneCountryCode
      phoneNumber
      address
      hasRural
      confirmationCode
      position
      valueTransport
      typeWoker
      status
      phoneVerification
      emailVerification
      type
      fullName
    }
    city {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    referencias {
      id
      createdAt
      updatedAt
      deletedAt
      observacion
      valor
      tipoProyecto {
        id
        createdAt
        updatedAt
        deletedAt
        nombre
        descripcion
        isActive
      }
      marca {
        id
        createdAt
        updatedAt
        deletedAt
        nombre
        isActive
      }
      referencia {
        id
        createdAt
        updatedAt
        deletedAt
        codigo
        descripcion
        isActive
      }
    }
  }
}
    `;

/**
 * __useProyectoQuery__
 *
 * To run a query within a React component, call `useProyectoQuery` and pass it any options that fit your needs.
 * When your component renders, `useProyectoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProyectoQuery({
 *   variables: {
 *      proyectoId: // value for 'proyectoId'
 *   },
 * });
 */
export function useProyectoQuery(baseOptions: Apollo.QueryHookOptions<ProyectoQuery, ProyectoQueryVariables> & ({ variables: ProyectoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProyectoQuery, ProyectoQueryVariables>(ProyectoDocument, options);
      }
export function useProyectoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProyectoQuery, ProyectoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProyectoQuery, ProyectoQueryVariables>(ProyectoDocument, options);
        }
export function useProyectoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProyectoQuery, ProyectoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProyectoQuery, ProyectoQueryVariables>(ProyectoDocument, options);
        }
export type ProyectoQueryHookResult = ReturnType<typeof useProyectoQuery>;
export type ProyectoLazyQueryHookResult = ReturnType<typeof useProyectoLazyQuery>;
export type ProyectoSuspenseQueryHookResult = ReturnType<typeof useProyectoSuspenseQuery>;
export type ProyectoQueryResult = Apollo.QueryResult<ProyectoQuery, ProyectoQueryVariables>;
export const CreateProyectCommentDocument = gql`
    mutation CreateProyectComment($createInput: CreateProyectCommentInput!) {
  createProyectComment(createInput: $createInput) {
    id
  }
}
    `;
export type CreateProyectCommentMutationFn = Apollo.MutationFunction<CreateProyectCommentMutation, CreateProyectCommentMutationVariables>;

/**
 * __useCreateProyectCommentMutation__
 *
 * To run a mutation, you first call `useCreateProyectCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProyectCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProyectCommentMutation, { data, loading, error }] = useCreateProyectCommentMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateProyectCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateProyectCommentMutation, CreateProyectCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProyectCommentMutation, CreateProyectCommentMutationVariables>(CreateProyectCommentDocument, options);
      }
export type CreateProyectCommentMutationHookResult = ReturnType<typeof useCreateProyectCommentMutation>;
export type CreateProyectCommentMutationResult = Apollo.MutationResult<CreateProyectCommentMutation>;
export type CreateProyectCommentMutationOptions = Apollo.BaseMutationOptions<CreateProyectCommentMutation, CreateProyectCommentMutationVariables>;
export const UpdateProyectCommentDocument = gql`
    mutation UpdateProyectComment($updateInput: UpdateProyectCoomentInput!) {
  updateProyectComment(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateProyectCommentMutationFn = Apollo.MutationFunction<UpdateProyectCommentMutation, UpdateProyectCommentMutationVariables>;

/**
 * __useUpdateProyectCommentMutation__
 *
 * To run a mutation, you first call `useUpdateProyectCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProyectCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProyectCommentMutation, { data, loading, error }] = useUpdateProyectCommentMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateProyectCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProyectCommentMutation, UpdateProyectCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProyectCommentMutation, UpdateProyectCommentMutationVariables>(UpdateProyectCommentDocument, options);
      }
export type UpdateProyectCommentMutationHookResult = ReturnType<typeof useUpdateProyectCommentMutation>;
export type UpdateProyectCommentMutationResult = Apollo.MutationResult<UpdateProyectCommentMutation>;
export type UpdateProyectCommentMutationOptions = Apollo.BaseMutationOptions<UpdateProyectCommentMutation, UpdateProyectCommentMutationVariables>;
export const ProyectCommentsDocument = gql`
    query ProyectComments($where: FindProyectCommentTypeWhere, $orderBy: [FindProyectCommentTypeOrderBy!]) {
  proyectComments(where: $where, orderBy: $orderBy) {
    id
    createdAt
    updatedAt
    deletedAt
    proyectDescription
    createdByUser {
      identificationNumber
      identificationType
      email
      fullName
    }
    file {
      id
      createdAt
      updatedAt
      deletedAt
      fileName
      fileExtension
      fileMode
      fileMongoId
      fileUrl
      url
      chunkSize
    }
  }
}
    `;

/**
 * __useProyectCommentsQuery__
 *
 * To run a query within a React component, call `useProyectCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProyectCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProyectCommentsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useProyectCommentsQuery(baseOptions?: Apollo.QueryHookOptions<ProyectCommentsQuery, ProyectCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProyectCommentsQuery, ProyectCommentsQueryVariables>(ProyectCommentsDocument, options);
      }
export function useProyectCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProyectCommentsQuery, ProyectCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProyectCommentsQuery, ProyectCommentsQueryVariables>(ProyectCommentsDocument, options);
        }
export function useProyectCommentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProyectCommentsQuery, ProyectCommentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProyectCommentsQuery, ProyectCommentsQueryVariables>(ProyectCommentsDocument, options);
        }
export type ProyectCommentsQueryHookResult = ReturnType<typeof useProyectCommentsQuery>;
export type ProyectCommentsLazyQueryHookResult = ReturnType<typeof useProyectCommentsLazyQuery>;
export type ProyectCommentsSuspenseQueryHookResult = ReturnType<typeof useProyectCommentsSuspenseQuery>;
export type ProyectCommentsQueryResult = Apollo.QueryResult<ProyectCommentsQuery, ProyectCommentsQueryVariables>;
export const FindStatisticStatusProyectDocument = gql`
    query FindStatisticStatusProyect($findStatisticStatusProyectId: ID!) {
  findStatisticStatusProyect(id: $findStatisticStatusProyectId) {
    valorTotal
    cantidad
    estado
    userId
  }
}
    `;

/**
 * __useFindStatisticStatusProyectQuery__
 *
 * To run a query within a React component, call `useFindStatisticStatusProyectQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindStatisticStatusProyectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindStatisticStatusProyectQuery({
 *   variables: {
 *      findStatisticStatusProyectId: // value for 'findStatisticStatusProyectId'
 *   },
 * });
 */
export function useFindStatisticStatusProyectQuery(baseOptions: Apollo.QueryHookOptions<FindStatisticStatusProyectQuery, FindStatisticStatusProyectQueryVariables> & ({ variables: FindStatisticStatusProyectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindStatisticStatusProyectQuery, FindStatisticStatusProyectQueryVariables>(FindStatisticStatusProyectDocument, options);
      }
export function useFindStatisticStatusProyectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindStatisticStatusProyectQuery, FindStatisticStatusProyectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindStatisticStatusProyectQuery, FindStatisticStatusProyectQueryVariables>(FindStatisticStatusProyectDocument, options);
        }
export function useFindStatisticStatusProyectSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindStatisticStatusProyectQuery, FindStatisticStatusProyectQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindStatisticStatusProyectQuery, FindStatisticStatusProyectQueryVariables>(FindStatisticStatusProyectDocument, options);
        }
export type FindStatisticStatusProyectQueryHookResult = ReturnType<typeof useFindStatisticStatusProyectQuery>;
export type FindStatisticStatusProyectLazyQueryHookResult = ReturnType<typeof useFindStatisticStatusProyectLazyQuery>;
export type FindStatisticStatusProyectSuspenseQueryHookResult = ReturnType<typeof useFindStatisticStatusProyectSuspenseQuery>;
export type FindStatisticStatusProyectQueryResult = Apollo.QueryResult<FindStatisticStatusProyectQuery, FindStatisticStatusProyectQueryVariables>;
export const TipoProyectosDocument = gql`
    query TipoProyectos {
  tipoProyectos {
    id
    createdAt
    updatedAt
    deletedAt
    nombre
    descripcion
    isActive
  }
}
    `;

/**
 * __useTipoProyectosQuery__
 *
 * To run a query within a React component, call `useTipoProyectosQuery` and pass it any options that fit your needs.
 * When your component renders, `useTipoProyectosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTipoProyectosQuery({
 *   variables: {
 *   },
 * });
 */
export function useTipoProyectosQuery(baseOptions?: Apollo.QueryHookOptions<TipoProyectosQuery, TipoProyectosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TipoProyectosQuery, TipoProyectosQueryVariables>(TipoProyectosDocument, options);
      }
export function useTipoProyectosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TipoProyectosQuery, TipoProyectosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TipoProyectosQuery, TipoProyectosQueryVariables>(TipoProyectosDocument, options);
        }
export function useTipoProyectosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TipoProyectosQuery, TipoProyectosQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TipoProyectosQuery, TipoProyectosQueryVariables>(TipoProyectosDocument, options);
        }
export type TipoProyectosQueryHookResult = ReturnType<typeof useTipoProyectosQuery>;
export type TipoProyectosLazyQueryHookResult = ReturnType<typeof useTipoProyectosLazyQuery>;
export type TipoProyectosSuspenseQueryHookResult = ReturnType<typeof useTipoProyectosSuspenseQuery>;
export type TipoProyectosQueryResult = Apollo.QueryResult<TipoProyectosQuery, TipoProyectosQueryVariables>;
export const MarcaProyectosDocument = gql`
    query MarcaProyectos {
  marcaProyectos {
    id
    createdAt
    updatedAt
    deletedAt
    nombre
    isActive
    referencias {
      id
      createdAt
      updatedAt
      deletedAt
      codigo
      descripcion
      isActive
    }
  }
}
    `;

/**
 * __useMarcaProyectosQuery__
 *
 * To run a query within a React component, call `useMarcaProyectosQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarcaProyectosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarcaProyectosQuery({
 *   variables: {
 *   },
 * });
 */
export function useMarcaProyectosQuery(baseOptions?: Apollo.QueryHookOptions<MarcaProyectosQuery, MarcaProyectosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MarcaProyectosQuery, MarcaProyectosQueryVariables>(MarcaProyectosDocument, options);
      }
export function useMarcaProyectosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MarcaProyectosQuery, MarcaProyectosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MarcaProyectosQuery, MarcaProyectosQueryVariables>(MarcaProyectosDocument, options);
        }
export function useMarcaProyectosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MarcaProyectosQuery, MarcaProyectosQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MarcaProyectosQuery, MarcaProyectosQueryVariables>(MarcaProyectosDocument, options);
        }
export type MarcaProyectosQueryHookResult = ReturnType<typeof useMarcaProyectosQuery>;
export type MarcaProyectosLazyQueryHookResult = ReturnType<typeof useMarcaProyectosLazyQuery>;
export type MarcaProyectosSuspenseQueryHookResult = ReturnType<typeof useMarcaProyectosSuspenseQuery>;
export type MarcaProyectosQueryResult = Apollo.QueryResult<MarcaProyectosQuery, MarcaProyectosQueryVariables>;
export const RemoveProyectoReferenciaDocument = gql`
    mutation RemoveProyectoReferencia($removeProyectoReferenciaId: ID!) {
  removeProyectoReferencia(id: $removeProyectoReferenciaId) {
    id
  }
}
    `;
export type RemoveProyectoReferenciaMutationFn = Apollo.MutationFunction<RemoveProyectoReferenciaMutation, RemoveProyectoReferenciaMutationVariables>;

/**
 * __useRemoveProyectoReferenciaMutation__
 *
 * To run a mutation, you first call `useRemoveProyectoReferenciaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProyectoReferenciaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProyectoReferenciaMutation, { data, loading, error }] = useRemoveProyectoReferenciaMutation({
 *   variables: {
 *      removeProyectoReferenciaId: // value for 'removeProyectoReferenciaId'
 *   },
 * });
 */
export function useRemoveProyectoReferenciaMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProyectoReferenciaMutation, RemoveProyectoReferenciaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProyectoReferenciaMutation, RemoveProyectoReferenciaMutationVariables>(RemoveProyectoReferenciaDocument, options);
      }
export type RemoveProyectoReferenciaMutationHookResult = ReturnType<typeof useRemoveProyectoReferenciaMutation>;
export type RemoveProyectoReferenciaMutationResult = Apollo.MutationResult<RemoveProyectoReferenciaMutation>;
export type RemoveProyectoReferenciaMutationOptions = Apollo.BaseMutationOptions<RemoveProyectoReferenciaMutation, RemoveProyectoReferenciaMutationVariables>;
export const CreateProyectoReferenciaDocument = gql`
    mutation CreateProyectoReferencia($createInput: AddReferenciaToProyectoInput!) {
  createProyectoReferencia(createInput: $createInput) {
    id
  }
}
    `;
export type CreateProyectoReferenciaMutationFn = Apollo.MutationFunction<CreateProyectoReferenciaMutation, CreateProyectoReferenciaMutationVariables>;

/**
 * __useCreateProyectoReferenciaMutation__
 *
 * To run a mutation, you first call `useCreateProyectoReferenciaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProyectoReferenciaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProyectoReferenciaMutation, { data, loading, error }] = useCreateProyectoReferenciaMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateProyectoReferenciaMutation(baseOptions?: Apollo.MutationHookOptions<CreateProyectoReferenciaMutation, CreateProyectoReferenciaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProyectoReferenciaMutation, CreateProyectoReferenciaMutationVariables>(CreateProyectoReferenciaDocument, options);
      }
export type CreateProyectoReferenciaMutationHookResult = ReturnType<typeof useCreateProyectoReferenciaMutation>;
export type CreateProyectoReferenciaMutationResult = Apollo.MutationResult<CreateProyectoReferenciaMutation>;
export type CreateProyectoReferenciaMutationOptions = Apollo.BaseMutationOptions<CreateProyectoReferenciaMutation, CreateProyectoReferenciaMutationVariables>;
export const TasksDocument = gql`
    query Tasks($orderBy: [FindTaskTypeOrderBy!], $where: FindTaskTypeWhere, $pagination: Pagination) {
  tasks(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    taskName
    taskDescription
    taskDateExpiration
    taskPriority
    taskStatus
    worker {
      email
      identificationType
      identificationNumber
      fullName
    }
    createdByUser {
      email
      identificationType
      identificationNumber
      fullName
    }
    taskComment {
      id
      createdAt
      updatedAt
      deletedAt
      taskDescription
      taskStatus
      createdByUser {
        email
        identificationType
        identificationNumber
        fullName
      }
      file {
        id
        createdAt
        updatedAt
        deletedAt
        fileName
        fileExtension
        fileMode
        fileMongoId
        url
      }
    }
  }
}
    `;

/**
 * __useTasksQuery__
 *
 * To run a query within a React component, call `useTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useTasksQuery(baseOptions?: Apollo.QueryHookOptions<TasksQuery, TasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TasksQuery, TasksQueryVariables>(TasksDocument, options);
      }
export function useTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TasksQuery, TasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TasksQuery, TasksQueryVariables>(TasksDocument, options);
        }
export function useTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TasksQuery, TasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TasksQuery, TasksQueryVariables>(TasksDocument, options);
        }
export type TasksQueryHookResult = ReturnType<typeof useTasksQuery>;
export type TasksLazyQueryHookResult = ReturnType<typeof useTasksLazyQuery>;
export type TasksSuspenseQueryHookResult = ReturnType<typeof useTasksSuspenseQuery>;
export type TasksQueryResult = Apollo.QueryResult<TasksQuery, TasksQueryVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($createInput: CreateTaskInput!) {
  createTask(createInput: $createInput) {
    id
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($updateInput: UpdateTaskInput!) {
  updateTask(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const CreateTaskCommentDocument = gql`
    mutation CreateTaskComment($createInput: CreateTaskCommentInput!) {
  createTaskComment(createInput: $createInput) {
    id
  }
}
    `;
export type CreateTaskCommentMutationFn = Apollo.MutationFunction<CreateTaskCommentMutation, CreateTaskCommentMutationVariables>;

/**
 * __useCreateTaskCommentMutation__
 *
 * To run a mutation, you first call `useCreateTaskCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskCommentMutation, { data, loading, error }] = useCreateTaskCommentMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateTaskCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskCommentMutation, CreateTaskCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskCommentMutation, CreateTaskCommentMutationVariables>(CreateTaskCommentDocument, options);
      }
export type CreateTaskCommentMutationHookResult = ReturnType<typeof useCreateTaskCommentMutation>;
export type CreateTaskCommentMutationResult = Apollo.MutationResult<CreateTaskCommentMutation>;
export type CreateTaskCommentMutationOptions = Apollo.BaseMutationOptions<CreateTaskCommentMutation, CreateTaskCommentMutationVariables>;
export const UpdateTaskCommentDocument = gql`
    mutation UpdateTaskComment($updateInput: UpdateTaskCoomentInput!) {
  updateTaskComment(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateTaskCommentMutationFn = Apollo.MutationFunction<UpdateTaskCommentMutation, UpdateTaskCommentMutationVariables>;

/**
 * __useUpdateTaskCommentMutation__
 *
 * To run a mutation, you first call `useUpdateTaskCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskCommentMutation, { data, loading, error }] = useUpdateTaskCommentMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateTaskCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskCommentMutation, UpdateTaskCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskCommentMutation, UpdateTaskCommentMutationVariables>(UpdateTaskCommentDocument, options);
      }
export type UpdateTaskCommentMutationHookResult = ReturnType<typeof useUpdateTaskCommentMutation>;
export type UpdateTaskCommentMutationResult = Apollo.MutationResult<UpdateTaskCommentMutation>;
export type UpdateTaskCommentMutationOptions = Apollo.BaseMutationOptions<UpdateTaskCommentMutation, UpdateTaskCommentMutationVariables>;
export const UsersDocument = gql`
    query Users($orderBy: [FindUsersOrderBy!], $where: FindUsersWhere, $pagination: Pagination) {
  users(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    middleName
    lastName
    secondSurname
    email
    identificationType
    identificationNumber
    dateIssue
    legalRepresentativeIdentificationType
    legalRepresentativeIdentificationNumber
    phoneCountryCode
    phoneNumber
    address
    hasRural
    confirmationCode
    position
    status
    phoneVerification
    emailVerification
    type
    valueTransport
    typeWoker
    subordinates {
      id
      fullName
      email
      identificationType
      identificationNumber
    }
    city {
      id
      name
    }
    department {
      id
      name
    }
    country {
      id
      name
    }
    userRoles {
      id
      name
    }
    userRolesFx {
      id
    }
    fullName
  }
  usersCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    currentPage
    itemsPerPage
    totalItems
    totalPages
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export function useUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<typeof useUsersSuspenseQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createInput: CreateUserInput!) {
  createUser(createInput: $createInput) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const RemoveUserDocument = gql`
    mutation RemoveUser($removeUserId: ID!) {
  removeUser(id: $removeUserId) {
    id
    fullName
    name
  }
}
    `;
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      removeUserId: // value for 'removeUserId'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateInput: UpdateUserInput!) {
  updateUser(updateInput: $updateInput) {
    id
    fullName
    lastName
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const AssignSubordinateDocument = gql`
    mutation AssignSubordinate($managerId: String!, $subordinateId: String!) {
  assignSubordinate(managerId: $managerId, subordinateId: $subordinateId) {
    id
  }
}
    `;
export type AssignSubordinateMutationFn = Apollo.MutationFunction<AssignSubordinateMutation, AssignSubordinateMutationVariables>;

/**
 * __useAssignSubordinateMutation__
 *
 * To run a mutation, you first call `useAssignSubordinateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignSubordinateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignSubordinateMutation, { data, loading, error }] = useAssignSubordinateMutation({
 *   variables: {
 *      managerId: // value for 'managerId'
 *      subordinateId: // value for 'subordinateId'
 *   },
 * });
 */
export function useAssignSubordinateMutation(baseOptions?: Apollo.MutationHookOptions<AssignSubordinateMutation, AssignSubordinateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignSubordinateMutation, AssignSubordinateMutationVariables>(AssignSubordinateDocument, options);
      }
export type AssignSubordinateMutationHookResult = ReturnType<typeof useAssignSubordinateMutation>;
export type AssignSubordinateMutationResult = Apollo.MutationResult<AssignSubordinateMutation>;
export type AssignSubordinateMutationOptions = Apollo.BaseMutationOptions<AssignSubordinateMutation, AssignSubordinateMutationVariables>;
export const RemoveSubordinateDocument = gql`
    mutation RemoveSubordinate($managerId: String!, $subordinateId: String!) {
  removeSubordinate(managerId: $managerId, subordinateId: $subordinateId) {
    id
  }
}
    `;
export type RemoveSubordinateMutationFn = Apollo.MutationFunction<RemoveSubordinateMutation, RemoveSubordinateMutationVariables>;

/**
 * __useRemoveSubordinateMutation__
 *
 * To run a mutation, you first call `useRemoveSubordinateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSubordinateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSubordinateMutation, { data, loading, error }] = useRemoveSubordinateMutation({
 *   variables: {
 *      managerId: // value for 'managerId'
 *      subordinateId: // value for 'subordinateId'
 *   },
 * });
 */
export function useRemoveSubordinateMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSubordinateMutation, RemoveSubordinateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSubordinateMutation, RemoveSubordinateMutationVariables>(RemoveSubordinateDocument, options);
      }
export type RemoveSubordinateMutationHookResult = ReturnType<typeof useRemoveSubordinateMutation>;
export type RemoveSubordinateMutationResult = Apollo.MutationResult<RemoveSubordinateMutation>;
export type RemoveSubordinateMutationOptions = Apollo.BaseMutationOptions<RemoveSubordinateMutation, RemoveSubordinateMutationVariables>;
export const VisitsDocument = gql`
    query Visits($orderBy: [FindVisitOrderBy!], $where: FindVisitWhere, $pagination: Pagination) {
  visits(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    description
    location
    dateVisit
    status
    isProyect
    latitude
    longitude
    client {
      id
      createdAt
      updatedAt
      deletedAt
      name
      numberDocument
      email
      telefono
      address
      type
      vertical
      celular
      city {
        id
        createdAt
        updatedAt
        deletedAt
        code
        name
      }
      department {
        id
        createdAt
        updatedAt
        deletedAt
        code
        name
      }
      country {
        id
        createdAt
        updatedAt
        deletedAt
        code
        name
      }
    }
    type {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      status
    }
    user {
      id
      createdAt
      updatedAt
      deletedAt
      name
      middleName
      lastName
      secondSurname
      email
      identificationType
      identificationNumber
      dateIssue
      legalRepresentativeIdentificationType
      legalRepresentativeIdentificationNumber
      phoneCountryCode
      phoneNumber
      address
      hasRural
      confirmationCode
      position
      status
      phoneVerification
      emailVerification
      type
      userRoles {
        id
        createdAt
        updatedAt
        deletedAt
        name
        description
        defaultForType
        users {
          id
          createdAt
          updatedAt
          deletedAt
          name
          middleName
          lastName
          secondSurname
          email
          identificationType
          identificationNumber
          dateIssue
          legalRepresentativeIdentificationType
          legalRepresentativeIdentificationNumber
          phoneCountryCode
          phoneNumber
          address
          hasRural
          confirmationCode
          position
          status
          phoneVerification
          emailVerification
          type
          fullName
        }
        roleFx {
          id
          createdAt
          updatedAt
          deletedAt
          permission
        }
      }
      userRolesFx {
        id
        createdAt
        updatedAt
        deletedAt
        permission
        role {
          id
          createdAt
          updatedAt
          deletedAt
          name
          description
          defaultForType
        }
      }
      fullName
    }
  }
  visitsCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useVisitsQuery__
 *
 * To run a query within a React component, call `useVisitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVisitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVisitsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useVisitsQuery(baseOptions?: Apollo.QueryHookOptions<VisitsQuery, VisitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VisitsQuery, VisitsQueryVariables>(VisitsDocument, options);
      }
export function useVisitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VisitsQuery, VisitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VisitsQuery, VisitsQueryVariables>(VisitsDocument, options);
        }
export function useVisitsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VisitsQuery, VisitsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VisitsQuery, VisitsQueryVariables>(VisitsDocument, options);
        }
export type VisitsQueryHookResult = ReturnType<typeof useVisitsQuery>;
export type VisitsLazyQueryHookResult = ReturnType<typeof useVisitsLazyQuery>;
export type VisitsSuspenseQueryHookResult = ReturnType<typeof useVisitsSuspenseQuery>;
export type VisitsQueryResult = Apollo.QueryResult<VisitsQuery, VisitsQueryVariables>;
export const VisitTypesDocument = gql`
    query VisitTypes($orderBy: [FindVisitTypeOrderBy!], $where: FindVisitTypeWhere, $pagination: Pagination) {
  visitTypes(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    description
    status
  }
  visitTypesCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    currentPage
    itemsPerPage
    totalItems
    totalPages
  }
}
    `;

/**
 * __useVisitTypesQuery__
 *
 * To run a query within a React component, call `useVisitTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useVisitTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVisitTypesQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useVisitTypesQuery(baseOptions?: Apollo.QueryHookOptions<VisitTypesQuery, VisitTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VisitTypesQuery, VisitTypesQueryVariables>(VisitTypesDocument, options);
      }
export function useVisitTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VisitTypesQuery, VisitTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VisitTypesQuery, VisitTypesQueryVariables>(VisitTypesDocument, options);
        }
export function useVisitTypesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VisitTypesQuery, VisitTypesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VisitTypesQuery, VisitTypesQueryVariables>(VisitTypesDocument, options);
        }
export type VisitTypesQueryHookResult = ReturnType<typeof useVisitTypesQuery>;
export type VisitTypesLazyQueryHookResult = ReturnType<typeof useVisitTypesLazyQuery>;
export type VisitTypesSuspenseQueryHookResult = ReturnType<typeof useVisitTypesSuspenseQuery>;
export type VisitTypesQueryResult = Apollo.QueryResult<VisitTypesQuery, VisitTypesQueryVariables>;
export const CreateVisitTypeDocument = gql`
    mutation CreateVisitType($createInput: CreateVisitTypeInput!) {
  createVisitType(createInput: $createInput) {
    id
  }
}
    `;
export type CreateVisitTypeMutationFn = Apollo.MutationFunction<CreateVisitTypeMutation, CreateVisitTypeMutationVariables>;

/**
 * __useCreateVisitTypeMutation__
 *
 * To run a mutation, you first call `useCreateVisitTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVisitTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVisitTypeMutation, { data, loading, error }] = useCreateVisitTypeMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateVisitTypeMutation(baseOptions?: Apollo.MutationHookOptions<CreateVisitTypeMutation, CreateVisitTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVisitTypeMutation, CreateVisitTypeMutationVariables>(CreateVisitTypeDocument, options);
      }
export type CreateVisitTypeMutationHookResult = ReturnType<typeof useCreateVisitTypeMutation>;
export type CreateVisitTypeMutationResult = Apollo.MutationResult<CreateVisitTypeMutation>;
export type CreateVisitTypeMutationOptions = Apollo.BaseMutationOptions<CreateVisitTypeMutation, CreateVisitTypeMutationVariables>;
export const VisitDocument = gql`
    query Visit($visitId: ID!) {
  visit(id: $visitId) {
    id
    createdAt
    updatedAt
    deletedAt
    description
    location
    dateVisit
    status
    isProyect
    longitude
    latitude
    client {
      id
      updatedAt
      deletedAt
      name
      numberDocument
      email
      telefono
      address
      type
      vertical
      celular
      createdAt
    }
    type {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      status
    }
  }
}
    `;

/**
 * __useVisitQuery__
 *
 * To run a query within a React component, call `useVisitQuery` and pass it any options that fit your needs.
 * When your component renders, `useVisitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVisitQuery({
 *   variables: {
 *      visitId: // value for 'visitId'
 *   },
 * });
 */
export function useVisitQuery(baseOptions: Apollo.QueryHookOptions<VisitQuery, VisitQueryVariables> & ({ variables: VisitQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VisitQuery, VisitQueryVariables>(VisitDocument, options);
      }
export function useVisitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VisitQuery, VisitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VisitQuery, VisitQueryVariables>(VisitDocument, options);
        }
export function useVisitSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VisitQuery, VisitQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VisitQuery, VisitQueryVariables>(VisitDocument, options);
        }
export type VisitQueryHookResult = ReturnType<typeof useVisitQuery>;
export type VisitLazyQueryHookResult = ReturnType<typeof useVisitLazyQuery>;
export type VisitSuspenseQueryHookResult = ReturnType<typeof useVisitSuspenseQuery>;
export type VisitQueryResult = Apollo.QueryResult<VisitQuery, VisitQueryVariables>;
export const UpdateVisitTypeDocument = gql`
    mutation UpdateVisitType($updateInput: UpdateVisitTypeInput!) {
  updateVisitType(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateVisitTypeMutationFn = Apollo.MutationFunction<UpdateVisitTypeMutation, UpdateVisitTypeMutationVariables>;

/**
 * __useUpdateVisitTypeMutation__
 *
 * To run a mutation, you first call `useUpdateVisitTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVisitTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVisitTypeMutation, { data, loading, error }] = useUpdateVisitTypeMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateVisitTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVisitTypeMutation, UpdateVisitTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVisitTypeMutation, UpdateVisitTypeMutationVariables>(UpdateVisitTypeDocument, options);
      }
export type UpdateVisitTypeMutationHookResult = ReturnType<typeof useUpdateVisitTypeMutation>;
export type UpdateVisitTypeMutationResult = Apollo.MutationResult<UpdateVisitTypeMutation>;
export type UpdateVisitTypeMutationOptions = Apollo.BaseMutationOptions<UpdateVisitTypeMutation, UpdateVisitTypeMutationVariables>;
export const RemoveVisitTypeDocument = gql`
    mutation RemoveVisitType($removeVisitTypeId: ID!) {
  removeVisitType(id: $removeVisitTypeId) {
    id
  }
}
    `;
export type RemoveVisitTypeMutationFn = Apollo.MutationFunction<RemoveVisitTypeMutation, RemoveVisitTypeMutationVariables>;

/**
 * __useRemoveVisitTypeMutation__
 *
 * To run a mutation, you first call `useRemoveVisitTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveVisitTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeVisitTypeMutation, { data, loading, error }] = useRemoveVisitTypeMutation({
 *   variables: {
 *      removeVisitTypeId: // value for 'removeVisitTypeId'
 *   },
 * });
 */
export function useRemoveVisitTypeMutation(baseOptions?: Apollo.MutationHookOptions<RemoveVisitTypeMutation, RemoveVisitTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveVisitTypeMutation, RemoveVisitTypeMutationVariables>(RemoveVisitTypeDocument, options);
      }
export type RemoveVisitTypeMutationHookResult = ReturnType<typeof useRemoveVisitTypeMutation>;
export type RemoveVisitTypeMutationResult = Apollo.MutationResult<RemoveVisitTypeMutation>;
export type RemoveVisitTypeMutationOptions = Apollo.BaseMutationOptions<RemoveVisitTypeMutation, RemoveVisitTypeMutationVariables>;
export const UpdateVisitDocument = gql`
    mutation UpdateVisit($updateInput: UpdateVisitInput!) {
  updateVisit(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateVisitMutationFn = Apollo.MutationFunction<UpdateVisitMutation, UpdateVisitMutationVariables>;

/**
 * __useUpdateVisitMutation__
 *
 * To run a mutation, you first call `useUpdateVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVisitMutation, { data, loading, error }] = useUpdateVisitMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateVisitMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVisitMutation, UpdateVisitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVisitMutation, UpdateVisitMutationVariables>(UpdateVisitDocument, options);
      }
export type UpdateVisitMutationHookResult = ReturnType<typeof useUpdateVisitMutation>;
export type UpdateVisitMutationResult = Apollo.MutationResult<UpdateVisitMutation>;
export type UpdateVisitMutationOptions = Apollo.BaseMutationOptions<UpdateVisitMutation, UpdateVisitMutationVariables>;
export const AcceptOrDeclineVisitDocument = gql`
    mutation AcceptOrDeclineVisit($updateStatusInput: UpdateStatusInput!) {
  acceptOrDeclineVisit(UpdateStatusInput: $updateStatusInput)
}
    `;
export type AcceptOrDeclineVisitMutationFn = Apollo.MutationFunction<AcceptOrDeclineVisitMutation, AcceptOrDeclineVisitMutationVariables>;

/**
 * __useAcceptOrDeclineVisitMutation__
 *
 * To run a mutation, you first call `useAcceptOrDeclineVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptOrDeclineVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptOrDeclineVisitMutation, { data, loading, error }] = useAcceptOrDeclineVisitMutation({
 *   variables: {
 *      updateStatusInput: // value for 'updateStatusInput'
 *   },
 * });
 */
export function useAcceptOrDeclineVisitMutation(baseOptions?: Apollo.MutationHookOptions<AcceptOrDeclineVisitMutation, AcceptOrDeclineVisitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptOrDeclineVisitMutation, AcceptOrDeclineVisitMutationVariables>(AcceptOrDeclineVisitDocument, options);
      }
export type AcceptOrDeclineVisitMutationHookResult = ReturnType<typeof useAcceptOrDeclineVisitMutation>;
export type AcceptOrDeclineVisitMutationResult = Apollo.MutationResult<AcceptOrDeclineVisitMutation>;
export type AcceptOrDeclineVisitMutationOptions = Apollo.BaseMutationOptions<AcceptOrDeclineVisitMutation, AcceptOrDeclineVisitMutationVariables>;
export const CreateVisitComentDocument = gql`
    mutation CreateVisitComent($createInput: CreateVisitComentInput!) {
  createVisitComent(createInput: $createInput) {
    id
  }
}
    `;
export type CreateVisitComentMutationFn = Apollo.MutationFunction<CreateVisitComentMutation, CreateVisitComentMutationVariables>;

/**
 * __useCreateVisitComentMutation__
 *
 * To run a mutation, you first call `useCreateVisitComentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVisitComentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVisitComentMutation, { data, loading, error }] = useCreateVisitComentMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateVisitComentMutation(baseOptions?: Apollo.MutationHookOptions<CreateVisitComentMutation, CreateVisitComentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVisitComentMutation, CreateVisitComentMutationVariables>(CreateVisitComentDocument, options);
      }
export type CreateVisitComentMutationHookResult = ReturnType<typeof useCreateVisitComentMutation>;
export type CreateVisitComentMutationResult = Apollo.MutationResult<CreateVisitComentMutation>;
export type CreateVisitComentMutationOptions = Apollo.BaseMutationOptions<CreateVisitComentMutation, CreateVisitComentMutationVariables>;
export const CreateVisitDocument = gql`
    mutation CreateVisit($createInput: CreateVisitInput!) {
  createVisit(createInput: $createInput) {
    id
  }
}
    `;
export type CreateVisitMutationFn = Apollo.MutationFunction<CreateVisitMutation, CreateVisitMutationVariables>;

/**
 * __useCreateVisitMutation__
 *
 * To run a mutation, you first call `useCreateVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVisitMutation, { data, loading, error }] = useCreateVisitMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateVisitMutation(baseOptions?: Apollo.MutationHookOptions<CreateVisitMutation, CreateVisitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVisitMutation, CreateVisitMutationVariables>(CreateVisitDocument, options);
      }
export type CreateVisitMutationHookResult = ReturnType<typeof useCreateVisitMutation>;
export type CreateVisitMutationResult = Apollo.MutationResult<CreateVisitMutation>;
export type CreateVisitMutationOptions = Apollo.BaseMutationOptions<CreateVisitMutation, CreateVisitMutationVariables>;
export const VentasPorVendedorDocument = gql`
    query VentasPorVendedor($input: GetSalesInput!) {
  ventasPorVendedor(input: $input) {
    vendedor
    nombre_mes
    numero_mes
    venta
    costo
    oip
    flete
    back
    utilidad
    utilidad_porcentaje
  }
}
    `;

/**
 * __useVentasPorVendedorQuery__
 *
 * To run a query within a React component, call `useVentasPorVendedorQuery` and pass it any options that fit your needs.
 * When your component renders, `useVentasPorVendedorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVentasPorVendedorQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVentasPorVendedorQuery(baseOptions: Apollo.QueryHookOptions<VentasPorVendedorQuery, VentasPorVendedorQueryVariables> & ({ variables: VentasPorVendedorQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VentasPorVendedorQuery, VentasPorVendedorQueryVariables>(VentasPorVendedorDocument, options);
      }
export function useVentasPorVendedorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VentasPorVendedorQuery, VentasPorVendedorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VentasPorVendedorQuery, VentasPorVendedorQueryVariables>(VentasPorVendedorDocument, options);
        }
export function useVentasPorVendedorSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VentasPorVendedorQuery, VentasPorVendedorQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VentasPorVendedorQuery, VentasPorVendedorQueryVariables>(VentasPorVendedorDocument, options);
        }
export type VentasPorVendedorQueryHookResult = ReturnType<typeof useVentasPorVendedorQuery>;
export type VentasPorVendedorLazyQueryHookResult = ReturnType<typeof useVentasPorVendedorLazyQuery>;
export type VentasPorVendedorSuspenseQueryHookResult = ReturnType<typeof useVentasPorVendedorSuspenseQuery>;
export type VentasPorVendedorQueryResult = Apollo.QueryResult<VentasPorVendedorQuery, VentasPorVendedorQueryVariables>;
export const VentasPorVendedorDepartamentoDocument = gql`
    query VentasPorVendedorDepartamento($input: GetSalesInput!) {
  ventasPorVendedorDepartamento(input: $input) {
    vendedor
    departamento
    venta
    costo
    oip
    flete
    back
    utilidad
    utilidad_porcentaje
  }
}
    `;

/**
 * __useVentasPorVendedorDepartamentoQuery__
 *
 * To run a query within a React component, call `useVentasPorVendedorDepartamentoQuery` and pass it any options that fit your needs.
 * When your component renders, `useVentasPorVendedorDepartamentoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVentasPorVendedorDepartamentoQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVentasPorVendedorDepartamentoQuery(baseOptions: Apollo.QueryHookOptions<VentasPorVendedorDepartamentoQuery, VentasPorVendedorDepartamentoQueryVariables> & ({ variables: VentasPorVendedorDepartamentoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VentasPorVendedorDepartamentoQuery, VentasPorVendedorDepartamentoQueryVariables>(VentasPorVendedorDepartamentoDocument, options);
      }
export function useVentasPorVendedorDepartamentoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VentasPorVendedorDepartamentoQuery, VentasPorVendedorDepartamentoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VentasPorVendedorDepartamentoQuery, VentasPorVendedorDepartamentoQueryVariables>(VentasPorVendedorDepartamentoDocument, options);
        }
export function useVentasPorVendedorDepartamentoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VentasPorVendedorDepartamentoQuery, VentasPorVendedorDepartamentoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VentasPorVendedorDepartamentoQuery, VentasPorVendedorDepartamentoQueryVariables>(VentasPorVendedorDepartamentoDocument, options);
        }
export type VentasPorVendedorDepartamentoQueryHookResult = ReturnType<typeof useVentasPorVendedorDepartamentoQuery>;
export type VentasPorVendedorDepartamentoLazyQueryHookResult = ReturnType<typeof useVentasPorVendedorDepartamentoLazyQuery>;
export type VentasPorVendedorDepartamentoSuspenseQueryHookResult = ReturnType<typeof useVentasPorVendedorDepartamentoSuspenseQuery>;
export type VentasPorVendedorDepartamentoQueryResult = Apollo.QueryResult<VentasPorVendedorDepartamentoQuery, VentasPorVendedorDepartamentoQueryVariables>;
export const GetDataDashboardDocument = gql`
    query GetDataDashboard($getDataDashboardId: String!) {
  getDataDashboard(id: $getDataDashboardId) {
    label
    total
    idUser
  }
}
    `;

/**
 * __useGetDataDashboardQuery__
 *
 * To run a query within a React component, call `useGetDataDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataDashboardQuery({
 *   variables: {
 *      getDataDashboardId: // value for 'getDataDashboardId'
 *   },
 * });
 */
export function useGetDataDashboardQuery(baseOptions: Apollo.QueryHookOptions<GetDataDashboardQuery, GetDataDashboardQueryVariables> & ({ variables: GetDataDashboardQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataDashboardQuery, GetDataDashboardQueryVariables>(GetDataDashboardDocument, options);
      }
export function useGetDataDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataDashboardQuery, GetDataDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataDashboardQuery, GetDataDashboardQueryVariables>(GetDataDashboardDocument, options);
        }
export function useGetDataDashboardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDataDashboardQuery, GetDataDashboardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDataDashboardQuery, GetDataDashboardQueryVariables>(GetDataDashboardDocument, options);
        }
export type GetDataDashboardQueryHookResult = ReturnType<typeof useGetDataDashboardQuery>;
export type GetDataDashboardLazyQueryHookResult = ReturnType<typeof useGetDataDashboardLazyQuery>;
export type GetDataDashboardSuspenseQueryHookResult = ReturnType<typeof useGetDataDashboardSuspenseQuery>;
export type GetDataDashboardQueryResult = Apollo.QueryResult<GetDataDashboardQuery, GetDataDashboardQueryVariables>;