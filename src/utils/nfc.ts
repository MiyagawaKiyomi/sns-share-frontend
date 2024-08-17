export async function readNFC(): Promise<string> {
	if ('NDEFReader' in window) {
	  try {
	    const ndef = new (window as any).NDEFReader();
	    await ndef.scan();
	    return new Promise((resolve) => {
	      ndef.onreading = (event: any) => {
		const decoder = new TextDecoder();
		for (const record of event.message.records) {
		  if (record.recordType === "text") {
		    const text = decoder.decode(record.data);
		    resolve(text);
		  }
		}
	      }
	    });
	  } catch (error) {
	    console.error("Error reading NFC:", error);
	    throw error;
	  }
	} else {
	  throw new Error("Web NFC is not supported in this browser.");
	}
      }