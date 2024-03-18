# angular-shake-AWSFeeded
Angular shake e-commerce project fed by AWSLambdaFunctions

# Description
Angular shake e-commerce front end fed by AWSLambdaFunctions exposed by AWS API Gateway endpoint

Project Components:
- The AWS Lambda project that is responsible for managing all the functionalities [here](https://github.com/Puntiss/java-shake-AWSLambdaFunctions).

# Live Test
If you want to try live code, visit the [website](https://angular-shake-shop.s3.us-east-2.amazonaws.com/index.html).

# Usage and Modify
**0. Prerequisites:**

- Install [Node.js version 18.18.0+](https://nodejs.org/en/download/current) or check if already installed with `node -v`.
- Install [npm version 9.8.1+](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or check if already installed with `npm -v`.
- Install [Angular CLI version 16.2.0+](https://angular.io/cli) or check if already installed with `ng v`.

**1. Configure AWS Lambda Functions:**
   
- Follow the detailed instructions in the GitHub projects linked above to configure the two AWS Lambda functions in your account.

**3. Obtain API Gateway Link:**
   
- After downloading the code, obtain the deployed link of your AWS Gateway API.
- Add the URL to the property `BASE_APIR_URL` inside the *src\app\.models\httpRequest.ts*.

**3. Install Project Dependencies:**
   
- Install all project dependencies specified in the *angular.json* file using `npm install`, a *node_module* folder will be created.

**5. Launch the Application:**

- Host the website on the server or launch your application using `ng serve`.

**6. See result**

- Navigate to `http://localhost:4200/` in your browser to see the result:

![](https://github.com/Puntiss/angular-shake-AWSFeeded/blob/master/screenshot/text%20filter.JPG)
![](https://github.com/Puntiss/angular-shake-AWSFeeded/blob/master/screenshot/user%20not%20found.JPG)
![](https://github.com/Puntiss/angular-shake-AWSFeeded/blob/master/screenshot/user%20saved.JPG)
![](https://github.com/Puntiss/angular-shake-AWSFeeded/blob/master/screenshot/login%20done.JPG)
![](https://github.com/Puntiss/angular-shake-AWSFeeded/blob/master/screenshot/info%20page.JPG)
![](https://github.com/Puntiss/angular-shake-AWSFeeded/blob/master/screenshot/filter%20price%20and%20qty%20home.JPG)
![](https://github.com/Puntiss/angular-shake-AWSFeeded/blob/master/screenshot/cart.JPG)
![](https://github.com/Puntiss/angular-shake-AWSFeeded/blob/master/screenshot/order%20made.JPG)
![](https://github.com/Puntiss/angular-shake-AWSFeeded/blob/master/screenshot/numOrder%20updated.JPG)

**7. Build Angular**

- To transform the Angular project into a static website use the command `ng build`

**8. Host on AWS S3 Bucket**

- On your AWS account create a new S3 Bucket, uncheck `BLOCK PUBLIC ACCESS` so that the public can access it
- Navigate to permission and add the following permission:
```json
{
    "Version": "2012-10-17",
    "Statement": [
   {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::BUCKET_NAME/*"
        }
    ]
}
```
- Navigate to properties and enable `Static website hosting`
  
**9. Custom domain**

- [Follow the guide](https://dev.to/aws-builders/how-to-deploy-a-static-website-on-amazon-s3-with-route-53-3o6p)

Happy coding!

