import * as AWS from 'aws-sdk/global';
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js'


const authenticationData = {
	Username: 'sraccoon',
	Password: 'wjdgusdlek1!',
};

const authenticationDetails = new AuthenticationDetails(
	authenticationData
);

const poolData = {
	UserPoolId: 'ap-northeast-2_2ZZaCuOfN', 
	ClientId: '76i53iu393us56v3dgbhgdjpof' 
};

const userPool = new CognitoUserPool(poolData);
const userData = {
	Username: 'sraccoon',
	Pool: userPool,
};

const cognitoUser = new CognitoUser(userData);
cognitoUser.authenticateUser(authenticationDetails, {
	onSuccess: function(result) {
		const data = result;

		//POTENTIAL: Region needs to be set if not already set previously elsewhere.
		AWS.config.region = 'ap-northeast-2';

		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
			IdentityPoolId: 'ap-northeast-2', // your identity pool id here
			Logins: {
				// Change the key below according to the specific region your user pool is in.
				'cognito-idp.ap-northeast-2.amazonaws.com/ap-northeast-2_2ZZaCuOfN': result
					.getIdToken()
					.getJwtToken(),
			},
		});


        console.log(data);
        console.log(AWS.config.credentials)
	},

	onFailure: function(err) {
		console.log(err);
	},
});
