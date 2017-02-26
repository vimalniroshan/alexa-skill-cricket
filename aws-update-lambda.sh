rm index.zip
cd lambda
zip -Xr ../index.zip *
cd ..
aws lambda update-function-code --function-name alexa-skill-cricket-lambda --zip-file fileb://index.zip --publish
