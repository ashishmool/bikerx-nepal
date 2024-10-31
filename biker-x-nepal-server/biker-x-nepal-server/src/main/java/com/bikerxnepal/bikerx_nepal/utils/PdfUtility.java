package com.bikerxnepal.bikerx_nepal.utils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

public class PdfUtility {

    public byte[] getPdfAsBytes(String fileName) {
        String filePath = "pdf_uploads/";  // Adjust this path based on your project structure
        File file = new File(filePath + fileName);
        byte[] bytes = new byte[0];
        try {
            bytes = Files.readAllBytes(file.toPath());
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return bytes;
    }
}
