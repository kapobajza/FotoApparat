package com.kapo.fotoapparat.FileConverter;

import android.net.Uri;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class FileConverterModule extends ReactContextBaseJavaModule {
  public FileConverterModule(ReactApplicationContext context) {
    super(context);
  }

  @NonNull
  @Override
  public String getName() {
    return "FileConverterModule";
  }

  @ReactMethod
  public void toByteArray(String uri, Promise promise) {
    Runnable runnable = () -> {
      try {
        Uri fileUri = Uri.parse(uri);
        File file = new File(fileUri.getPath());
        int size = (int) file.length();
        byte[] bytes = new byte[size];
        BufferedInputStream buf = new BufferedInputStream(new FileInputStream(file));
        buf.read(bytes, 0, bytes.length);
        buf.close();

        WritableArray wArray = Arguments.createArray();

        for (int i = 0; i < bytes.length; i++) {
          wArray.pushInt(bytes[i]);
        }

        WritableMap data = Arguments.createMap();
        data.putArray("byteArray", wArray);
        promise.resolve(data);
      } catch (FileNotFoundException e) {
        promise.reject("File not found", e);
      } catch (IOException e) {
        promise.reject("IO Error", e);
      } catch (Exception e) {
        promise.reject(e);
      }
    };

    new Thread(runnable).start();
  }
}
