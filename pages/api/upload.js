// export default function handler(req, res) {
//     res.status(200).json(req.body)
//     // console.log(req.body)

    
// }
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb' // Set desired value here
        }
    }
}

export default function handler(req, res) {
    if (req.method === 'POST') {
      // Process a POST request
      res.status(200).json({ data: 'success' });
    } else {
      // Handle any other HTTP method
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }
  };

  