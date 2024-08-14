import AWS from "aws-sdk";

export const uploadToS3 = async (data: any, fileName: string) => {
  const BUCKET_NAME = "full-stack-expense-tracker";
  const IAM_USER_KEY_ID = process.env.AWS_SECRET_KEY_ID;
  const IAM_USER_SECRET_KEY = process.env.AWS_SECRET_KEY;

  const s3Bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY_ID,
    secretAccessKey: IAM_USER_SECRET_KEY,
  });

  var params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: data,
    ACL: "public-read",
    ContentType: "text/plain",
    ContentDisposition: 'attachment; filename="myexpense.csv"',
  };

  return new Promise((resolve, reject) => {
    s3Bucket.upload(params, (err: any, s3Response: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(s3Response.Location);
      }
    });
  });
};
