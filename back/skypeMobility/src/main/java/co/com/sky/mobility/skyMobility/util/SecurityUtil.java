/**
 * 
 */
package co.com.sky.mobility.skyMobility.util;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.security.KeyPair;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Base64;

import javax.crypto.Cipher;

import org.apache.logging.log4j.util.Strings;

import static co.com.sky.mobility.skyMobility.util.Constants.KEY_ALIAS;
import static co.com.sky.mobility.skyMobility.util.Constants.KEY_PASSWORD;
import static co.com.sky.mobility.skyMobility.util.Constants.KEYSTORE_PATHNAME;
import static co.com.sky.mobility.skyMobility.util.Constants.KEYSTORE_PASSWORD;

/**
 * @author cguzmanp
 *
 */
public class SecurityUtil {
	

	/**
	 * 
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public static String encryptPassword(String password) throws Exception {
		
		if (Strings.isEmpty(password)) 
			throw new Exception("The password field is required!");
		
		KeyPair keyPair = getKeyPairFromKeyStore();
		PublicKey publicKey = keyPair.getPublic();
		return encrypt(password, publicKey);
	}
	
	/**
	 * 
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public static String decryptPassword(String password) throws Exception {
		
		if (Strings.isEmpty(password)) 
			throw new Exception("The password field is required!");
		
		KeyPair keyPair = getKeyPairFromKeyStore();
		PrivateKey privatekey = keyPair.getPrivate();
		return decrypt(password, privatekey);
	}
	
	/**
	 * 
	 * @param cipherText
	 * @param privateKey
	 * @return
	 * @throws Exception
	 */
	private static String decrypt(String cipherText, PrivateKey privateKey) throws Exception {
	    byte[] bytes = Base64.getDecoder().decode(cipherText);

	    Cipher decriptCipher = Cipher.getInstance("RSA");
	    decriptCipher.init(Cipher.DECRYPT_MODE, privateKey);

	    return new String(decriptCipher.doFinal(bytes), StandardCharsets.UTF_8);
	}
	
	/**
	 * 
	 * @return
	 * @throws Exception
	 */
	private static KeyPair getKeyPairFromKeyStore() throws Exception {
	    InputStream ins = SecurityUtil.class.getResourceAsStream(KEYSTORE_PATHNAME);

	    KeyStore keyStore = KeyStore.getInstance("JKS");
	    keyStore.load(ins, KEYSTORE_PASSWORD);   //Keystore password
	    KeyStore.PasswordProtection keyPassword = new KeyStore.PasswordProtection(KEY_PASSWORD);

	    KeyStore.PrivateKeyEntry privateKeyEntry = (KeyStore.PrivateKeyEntry) keyStore.getEntry(KEY_ALIAS, keyPassword);

	    java.security.cert.Certificate cert = keyStore.getCertificate(KEY_ALIAS);
	    PublicKey publicKey = cert.getPublicKey();
	    PrivateKey privateKey = privateKeyEntry.getPrivateKey();

	    return new KeyPair(publicKey, privateKey);
	}
	
	/**
	 * 
	 * @param plainText
	 * @param publicKey
	 * @return
	 * @throws Exception
	 */
	private static String encrypt(String plainText, PublicKey publicKey) throws Exception {
	    Cipher encryptCipher = Cipher.getInstance("RSA");
	    encryptCipher.init(Cipher.ENCRYPT_MODE, publicKey);

	    byte[] cipherText = encryptCipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));

	    return Base64.getEncoder().encodeToString(cipherText);
	}
}
