#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

// === WiFi ===
const char* ssid     = "Wokwi-GUEST";
const char* password = "";

// === API ===
const char* host = "http://10.131.58.3:3000";  // <-- use your PC IP
const char* sensorId = "1";

// === DHT ===
#define DHTPIN 15
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();

  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password, 6);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected!");
}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT!");
    delay(2000);
    return;
  }

  Serial.printf("Temp: %.2f °C, Humidity: %.2f %%\n", t, h);

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = String(host) + "/sensors/" + sensorId;
    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    String body = "{";
    body += "\"temperature\":" + String(t, 2) + ",";
    body += "\"humidity\":" + String(h, 2);
    body += "}";

    int code = http.sendRequest("PATCH", body);

    if (code > 0) {
      Serial.printf("PATCH Response: %d\n", code);
      Serial.println(http.getString());
    } else {
      Serial.printf("HTTP Error: %s\n", http.errorToString(code).c_str());
    }
    http.end();
  }
  delay(5000);
}
