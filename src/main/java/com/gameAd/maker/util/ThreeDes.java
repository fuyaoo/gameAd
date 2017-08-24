package com.gameAd.maker.util;

import sun.security.provider.X509Factory;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.Key;
import java.security.MessageDigest;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.Base64;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

public class ThreeDes {


	private static String certstr = "-----BEGIN CERTIFICATE-----" +
			"MIICRzCCAbACCQCEwTrLj/zDfTANBgkqhkiG9w0BAQUFADBoMQswCQYDVQQGEwJD" +
			"TjELMAkGA1UEChMCSVQxEzARBgNVBAMTCkdlc3NTZXJ2ZXIxEDAOBgNVBAgTB0d1" +
			"YW5nWGkxEDAOBgNVBAcTB05hbk5pbmcxEzARBgNVBAsTCkdlc3NTZXJ2ZXIwHhcN" +
			"MTYwNzI5MDk0NjE5WhcNMjYwNzI3MDk0NjE5WjBoMQswCQYDVQQGEwJDTjELMAkG" +
			"A1UEChMCSVQxEzARBgNVBAMTCkdlc3NTZXJ2ZXIxEDAOBgNVBAgTB0d1YW5nWGkx" +
			"EDAOBgNVBAcTB05hbk5pbmcxEzARBgNVBAsTCkdlc3NTZXJ2ZXIwgZ8wDQYJKoZI" +
			"hvcNAQEBBQADgY0AMIGJAoGBAOvuj7sEV9ebMEKL2zA5/p5dKn3nyQLLfkecJJs1" +
			"3Sl3lf5EMbLN66eYyhO35+TfRdnr898zhn4qkJVIsBHyjNK9NC83hDAE/8Xi99kW" +
			"EZDvc6dv+VYCLku4SOnXbG8v4QJyvKYagFCOt3WMZT4DNrWHJ+oTi3QDJF0AcpQg" +
			"MKAvAgMBAAEwDQYJKoZIhvcNAQEFBQADgYEAtMnsa2plmGFyTamtqZeGdratOlVx" +
			"fTh5QrPdUppTq3h1wWW1jZeUPwJGHdpnBlSW22t/PJK+R68NlnuCHzhvXQ+P6RVS" +
			"IjN3xpvERgufEVIywe1FuZPVcxLRaNUyhlKPR64XI3FtEaK+iNrpP7VZkDd24sjO" +
			"E5rqUrop2hWyJqI=" +
			"-----END CERTIFICATE-----";
	/**
	 * 3DES加密
	 * @param key	密钥
	 * @param iv	iv向量
	 * @param data	待加密内容
	 * @return
	 * @throws Exception
	 */
	public static byte[] encode(byte[] key, byte[] iv, byte[] data) throws Exception {
		Cipher cipher = Cipher.getInstance("DESede/CBC/PKCS5Padding");
		cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(key, "DESede"), new IvParameterSpec(iv));
		return cipher.doFinal(data, 0, data.length);
	}

	public static byte[] decrypt(byte[] key, byte[] iv, byte[] data) throws Exception {
		Cipher c = Cipher.getInstance("DESede/CBC/PKCS5Padding");
		c.init(Cipher.DECRYPT_MODE, new SecretKeySpec(key, "DESede"), new IvParameterSpec(iv));
		return c.doFinal(data);
	}

	public static byte[] rsaEncrypt(byte[] src, Key key) throws IOException, GeneralSecurityException {
		Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
		cipher.init(Cipher.ENCRYPT_MODE, key);
		ByteArrayOutputStream daos = new ByteArrayOutputStream();
		for (int i = 0; i < src.length; i = i + 100) {
			int len = 0;
			if ((i + 100) > src.length) {
				len = src.length - i;
			} else {
				len = 100;
			}

			byte[] tmp = new byte[len];
			System.arraycopy(src, i, tmp, 0, tmp.length);
			daos.write(cipher.doFinal(tmp));
		}

		return daos.toByteArray();
	}

	public static byte[] rsaDescrypt(byte[] src, Key key) throws IOException, GeneralSecurityException {
		Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
		cipher.init(Cipher.DECRYPT_MODE, key);
		ByteArrayOutputStream daos = new ByteArrayOutputStream();
		for (int i = 0; i < src.length; i = i + 128) {
			byte[] tmp = new byte[128];
			System.arraycopy(src, i, tmp, 0, tmp.length);
			daos.write(cipher.doFinal(tmp));
		}

		return daos.toByteArray();
	}

	public static X509Certificate convertToX509Certificate(String certStr) throws CertificateException, IOException {

		String str = certStr.replaceAll(X509Factory.BEGIN_CERT, "").replaceAll(X509Factory.END_CERT, "");
        byte [] decoded = Base64.getDecoder().decode(str);

        return (X509Certificate)CertificateFactory.getInstance("X.509").generateCertificate(new ByteArrayInputStream(decoded));
    }

	private static final char HEX_DIGITS[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };

	private static String toHexString(byte[] b) {
	    StringBuilder sb = new StringBuilder(b.length * 2);
	    for (int i = 0; i < b.length; i++) {
	        sb.append(HEX_DIGITS[(b[i] & 0xf0) >>> 4]);
	        sb.append(HEX_DIGITS[b[i] & 0x0f]);
	    }
	    return sb.toString();
	}

	public static String MD5Bit32(String SourceString) throws Exception {
	    MessageDigest digest = MessageDigest.getInstance("MD5");
	    digest.update(SourceString.getBytes());
	    byte messageDigest[] = digest.digest();
	    return toHexString(messageDigest);
	}

	public static String MD5Bit16(String SourceString) throws Exception {
	    return MD5Bit32(SourceString).substring(8, 24);
	}

	public static byte[] zipCompress(byte[] data) throws IOException {
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		GZIPOutputStream gzipOutputStream= new GZIPOutputStream(byteArrayOutputStream);
		gzipOutputStream.write(data);
		gzipOutputStream.flush();
		//这里一定要先把gzipOutputStream流关闭了，否则得到的是部分数据,并且下面在解压缩的时候会出现EOFException异常
		gzipOutputStream.close();
		byteArrayOutputStream.close();

		return byteArrayOutputStream.toByteArray();
	}

	public static byte[] zipDecompress(byte[] data) {
		String ret = "";
		byte[] unCompressByte = null;
		GZIPInputStream gunzip = null;
		try {
			gunzip = new GZIPInputStream(new ByteArrayInputStream(data));
			ByteArrayOutputStream compressByteArrayOut=new ByteArrayOutputStream();
			byte[] buffer=new byte[4096];
			int temp=-1;
			while((temp=gunzip.read(buffer))>0){
				compressByteArrayOut.write(buffer, 0, temp);
			}
			unCompressByte = compressByteArrayOut.toByteArray();

			gunzip.close();
			compressByteArrayOut.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return unCompressByte;
	}

	public static byte[] compress(byte[] data) throws IOException {
			byte[] tArray;
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		GZIPOutputStream gzip = new GZIPOutputStream(out);
		try {
			gzip.write(data);
			gzip.flush();
		} finally {
			gzip.close();
		}

		tArray = out.toByteArray();
		out.close();

		return tArray;
	}

	public static byte[] DoDecrypt(byte[] bBody, int encryptMode) throws Exception {
		String key = "FAJA2LFA9WR9FSASF92FMMAF";
		String iv = "8A402C31";

		switch (encryptMode) {
			case 0:
				break;

			case 1:
				X509Certificate cert = convertToX509Certificate(certstr);
				Key publicKey = cert.getPublicKey();
				bBody = rsaDescrypt(bBody, publicKey);

				break;

			case 2:
			case 3:
				bBody = ThreeDes.decrypt(key.getBytes(), iv.getBytes(), bBody);
				break;

			case 4:
				bBody = zipDecompress(bBody);
			default:
				break;
		}


		return bBody;
	}
}
