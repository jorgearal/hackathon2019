/**
 * 
 */
package co.com.sky.mobility.skyMobility.util;

import java.security.SecureRandom;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Random;

import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;

/**
 * @author cguzmanp
 *
 */
public class DateUtil {

	private static final SimpleDateFormat DATETIME_STANDARD_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	/**
	 * 
	 * @return {@link XMLGregorianCalendar}
	 * @throws ParseException
	 * @throws DatatypeConfigurationException
	 */
	public static XMLGregorianCalendar generateXMLGregorianCalendar() {
		XMLGregorianCalendar result;
		result = null;
		try {

			Date date = Calendar.getInstance().getTime();
			GregorianCalendar gregorianCalendar;

			gregorianCalendar = (GregorianCalendar) GregorianCalendar.getInstance();
			gregorianCalendar.setTime(date);
			result = DatatypeFactory.newInstance().newXMLGregorianCalendar(gregorianCalendar);
		} catch (DatatypeConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return result;
	}

	/**
	 * 
	 * @return {@link XMLGregorianCalendar}
	 * @throws ParseException
	 * @throws DatatypeConfigurationException
	 */
	public static XMLGregorianCalendar date2XMLGregorianCalendar(Date date) throws ParseException, DatatypeConfigurationException {
		XMLGregorianCalendar result = null;
		GregorianCalendar gregorianCalendar;

		gregorianCalendar = (GregorianCalendar) GregorianCalendar.getInstance();
		gregorianCalendar.setTime(date);
		result = DatatypeFactory.newInstance().newXMLGregorianCalendar(gregorianCalendar);

		return result;
	}

	/**
	 * 
	 * @return {@link XMLGregorianCalendar}
	 * @throws ParseException
	 * @throws DatatypeConfigurationException
	 */
	public static String XMLGregorianCalendar2String(XMLGregorianCalendar xmlGregorianCalendar) {
		Date date = xmlGregorianCalendar.toGregorianCalendar().getTime();
		String result = DATETIME_STANDARD_FORMAT.format(date);            
		return result;
	}

	/**
	 * 
	 * @param dateString
	 * @return
	 */
	public static Date stringToDate(String dateString) {
		Date result = null; 
		try {
			result = DATETIME_STANDARD_FORMAT.parse(dateString);
		} catch (ParseException e) {
			e.printStackTrace();
		} 

		return result;
	}

	/**
	 * 
	 * @param useStandarFormat
	 * @return
	 */
	public static String tomarFechaActualString() {
		return DATETIME_STANDARD_FORMAT.format(Calendar.getInstance().getTime());
	}


	/**
	 * 
	 * @return
	 */
	public static String estimarTiempoRuta() {

		int val;
		String timeStr = "";
		do { 
			SecureRandom x = new SecureRandom();
			Random generator = new Random(x.nextLong());
			LocalTime time = LocalTime.MIN.plusSeconds(generator.nextLong());
			timeStr = time.toString().substring(0, 2);
			val = Integer.parseInt(timeStr);
		} while (val < 10);
		return timeStr + " min";

	}
}
