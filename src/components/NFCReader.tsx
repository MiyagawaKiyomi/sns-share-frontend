import React, { useEffect, useState } from 'react';

const NFCReader: React.FC = () => {
  const [nfcSupported, setNfcSupported] = useState<boolean | null>(null);
  const [nfcMessage, setNfcMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkNfcSupport = () => {
      if ('NDEFReader' in window) {
        setNfcSupported(true);
      } else {
        setNfcSupported(false);
      }
    };

    checkNfcSupport();
  }, []);

  const startNfcScan = async () => {
    if (!nfcSupported) {
      setNfcMessage('このデバイスはNFCをサポートしていません。');
      return;
    }

    try {
      const ndef = new (window as any).NDEFReader();
      await ndef.scan();
      
      setNfcMessage('NFCスキャンを開始しました。NFCタグをかざしてください。');

      ndef.addEventListener("reading", ({ message }: any) => {
        for (const record of message.records) {
          if (record.recordType === "text") {
            const textDecoder = new TextDecoder();
            const text = textDecoder.decode(record.data);
            setNfcMessage(`NFCタグから読み取りました: ${text}`);
          }
        }
      });
    } catch(error) {
      console.error("NFC読み取りエラー:", error);
      setNfcMessage('NFC読み取り中にエラーが発生しました。');
    }
  };

  return (
    <div>
      <h2>NFC読み取り</h2>
      {nfcSupported === null ? (
        <p>NFCサポートを確認中...</p>
      ) : nfcSupported ? (
        <button onClick={startNfcScan}>NFCスキャンを開始</button>
      ) : (
        <p>このデバイスはNFCをサポートしていません。</p>
      )}
      {nfcMessage && <p>{nfcMessage}</p>}
    </div>
  );
};

export default NFCReader;