// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';

    /**
     * Logout user from current session
     */
    logout: boolean | null;

    /**
     * Returns details of user which is logged in
     */
    me: IUser | null;

    /**
     * Ping can be used to find is server alive or not
     */
    ping: string;
  }

  /**
   * These are basic details of any account
   */
  interface IUser {
    __typename: 'User';
    id: string | null;
    name: string | null;

    /**
     * Multiple emails are associated with single account
     */
    emails: Array<IEmail | null> | null;

    /**
     * Multiple phones are associated with single account
     */
    phones: Array<IPhone | null> | null;
  }

  /**
   * Email is unique for all account
   */
  interface IEmail {
    __typename: 'Email';
    email: string | null;

    /**
     * Emails will be verified by the user
     */
    verified: boolean | null;
  }

  /**
   * Phone is unique for all account
   */
  interface IPhone {
    __typename: 'Phone';

    /**
     * Country code of phone number, defaults to 91; Does not contain '+'.
     */
    country: string | null;

    /**
     * Real number of user excluding country code, for india 10 digit  number is required
     */
    number: string | null;

    /**
     * Id the phone verified
     */
    verified: boolean | null;
  }

  interface IMutation {
    __typename: 'Mutation';

    /**
     * Login/Create account with google
     */
    loginWithGoogle: IUser | null;
  }

  interface ILoginWithGoogleOnMutationArguments {
    id: string;
    token: string;
  }
}

// tslint:enable
