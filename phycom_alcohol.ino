
#include <WiFiS3.h>
#include <ArduinoHttpClient.h> 
#include <WiFiSSLClient.h>
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);

const char* ssid = "SM-A356E";
//const char* password = "12345678";

const char* host = "www2.it.kmitl.ac.th";
const int httpsPort = 443; 

const int AOUTpin = 0; 
int value;4
#define VCC      5.0
#define R_LOAD   10.0
float adcValue=0, val=0, mgL=0;
const int RED_PIN = 8;   
const int GREEN_PIN = 10;  
const int BLUE_PIN = 11;   
float R0 = 10.0;
float CURVE_A = 0.3995;
float CURVE_B = -1.503;
unsigned long int currenttime = 0;

WiFiSSLClient wifi; 
HttpClient http = HttpClient(wifi, host, httpsPort); 

void setup() {
  Serial.begin(9600);
  delay(1000);
  lcd.init();
  lcd.backlight();
  lcd.print("hello, kmitl IT");
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
  Serial.println("Connecting to Wi-Fi...");
  WiFi.begin(ssid);
  while (WiFi.status() != WL_CONNECTED) {
    delay(300);
    Serial.print(".");
  }
  Serial.println("\nConnected to Wi-Fi");
  Serial.println("Ready to send HTTPS requests...");
}

void loop() {
  lcd.clear();
  adcValue=0;
  Serial.print("Alcohol value: ");
  adcValue+= analogRead(AOUTpin);
  delay(10);
  val = (adcValue / 1023.0) * VCC;
  float R_S = (VCC * R_LOAD / val) - R_LOAD;
  float Ratio = R_S / R0;
  if (Ratio <= 0) Ratio = 0.01;
  mgL = CURVE_A * pow(Ratio, CURVE_B) * 10;
  if (mgL < 0.1) mgL = 0.0;
  Serial.println(mgL);
  Serial.println("mg/L  ");
  lcd.setCursor(0, 0);
  lcd.print("Alcohol value: ");
  lcd.setCursor(0, 1);
  lcd.print(mgL);
  lcd.setCursor(8, 1);
  lcd.println("mg.%    ");
  if (mgL > 50.00) {      
    digitalWrite(RED_PIN, LOW);   
    digitalWrite(GREEN_PIN, HIGH);   
    digitalWrite(BLUE_PIN, HIGH);   
  }
  else if (mgL >= 30.00 && mgL < 50.00) { 
    digitalWrite(RED_PIN, LOW);     
    digitalWrite(GREEN_PIN, LOW);   
    digitalWrite(BLUE_PIN, HIGH);  
  }
  else {                 
    digitalWrite(RED_PIN, HIGH);     
    digitalWrite(GREEN_PIN, LOW);  
    digitalWrite(BLUE_PIN, HIGH);  
  }

  Serial.println("Making HTTPS GET request...");

  if (millis() - currenttime > 1500) {
    currenttime = millis();
    String url = "/~it67070057/project/PhycomAlchohol/value.php?t=set&v=" + String(mgL);

    http.get(url);

    int code = http.responseStatusCode();

    String response = http.responseBody();

    if (code == 200) {
      Serial.println("Success (Code: 200)");
    } else {
      Serial.println("Error (Code: " + String(code) + ")");
    }
    Serial.println("Server response: " + response);
  }
  delay(300);
}