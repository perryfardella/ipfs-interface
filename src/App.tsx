import React from 'react';
import { create, CID, IPFSHTTPClient } from 'ipfs-http-client';
import './App.css';

let ipfs: IPFSHTTPClient | undefined;
try {
  ipfs = create({
    url: 'https://ipfs.infura.io:5001/api/v0',
  });
} catch (error) {
  console.error('IPFS error ', error);
  ipfs = undefined;
}

const App = () => {
  const [images, setImages] = React.useState<{ cid: CID; path: string }[]>([]);
  const [fileCid, setFileCid] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onUploadSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const files = (form[0] as HTMLInputElement).files;

    if (!files || files.length === 0) {
      return alert('No files selected');
    }

    const file = files[0];

    // upload files
    const result = await (ipfs as IPFSHTTPClient).add(file);

    console.log(result.cid.toString());
    setImages([
      ...images,
      {
        cid: result.cid,
        path: result.path,
      },
    ]);

    form.reset();
  };

  const onDownloadSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsLoading(true);

    const form = event.target as HTMLFormElement;
    await setFileCid((form[0] as HTMLInputElement).value);

    setIsLoading(false);

    form.reset();
  };

  return (
    <div className='App'>
      <header className='App-header'>
        {ipfs && (
          <>
            <p>Upload File using IPFS</p>

            <form onSubmit={onUploadSubmitHandler}>
              <input name='fileUpload' type='file' />

              <button type='submit'>Upload File</button>
            </form>
            
            {images.length >= 1 && <p>{`Image uploaded to the IPFS, cid: ${images[0].cid}`}</p>}

          </>
        )}

        {ipfs && (
          <>
            <p>Retrieve File from the IPFS</p>

            <form onSubmit={onDownloadSubmitHandler}>
              <input name='fileDownload' type='text' />

              <button type='submit'>Retrieve File</button>
            </form>

            {fileCid && !isLoading && <img src={`https://gateway.ipfs.io/ipfs/${fileCid}`} alt='the retrieved file from the IPFS'>
            </img>}
  
          </>
        )}

        {!ipfs && (
          <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
        )}
      </header>
    </div>
  );
};

export default App;
