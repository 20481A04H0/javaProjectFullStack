package com.iqquestlearning.be.controller;

import java.io.FileInputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class StudentAttendanceController {

	private static final String STUDENTS_FILE_PATH = "src/main/resources/uploads/students.xlsx";

	@GetMapping("/api/attendanceByEmail")
	public ResponseEntity<?> getAttendanceByEmailApi(@RequestParam String email) {
		return getAttendanceByEmailMonthly(email);
	}
	
	@GetMapping("/attendanceByEmail")
	public ResponseEntity<?> getAttendanceByEmailMonthly(@RequestParam String email) {
	    try (FileInputStream fis = new FileInputStream(STUDENTS_FILE_PATH);
	         Workbook workbook = new XSSFWorkbook(fis)) {

	        Sheet sheet = workbook.getSheetAt(0);
	        Row headerRow = sheet.getRow(0);
	        if (headerRow == null) return ResponseEntity.badRequest().body("Header row missing in Excel");

	        int emailColIdx = 2; // Email column index
	        int firstDateCol = 7; // First attendance date column index
	        int lastCol = headerRow.getLastCellNum();

	        // Parse dates and get month-year for each attendance column
	        List<String> rawDateHeaders = new ArrayList<>();
	        List<String> monthYearHeaders = new ArrayList<>();
	        SimpleDateFormat inFormat = new SimpleDateFormat("dd-MM-yyyy");
	        SimpleDateFormat outFormat = new SimpleDateFormat("MMMM yyyy");
	        for (int i = firstDateCol; i < lastCol; i++) {
	            Cell c = headerRow.getCell(i);
	            String dateRaw = (c == null) ? "" : getCellValueAsString(c).trim();
	            System.out.println("Column " + i + ", raw header value: |" + dateRaw + "|, cellType=" + (c == null ? "null" : c.getCellType()));
	            rawDateHeaders.add(dateRaw);
	            if (!dateRaw.isEmpty()) {
	                try {
	                    Date d = null;
	                    try { d = new SimpleDateFormat("dd-MM-yyyy").parse(dateRaw); }
	                    catch (Exception e) { d = new SimpleDateFormat("dd/MM/yyyy").parse(dateRaw); }
	                    monthYearHeaders.add(outFormat.format(d));
	                } catch (Exception e) {
	                    System.out.println(">>> Header date parse fail for |" + dateRaw + "|: " + e);
	                    monthYearHeaders.add("");
	                }
	            } else {
	                monthYearHeaders.add("");
	            }
	        }



	        int rowCount = sheet.getPhysicalNumberOfRows();
	        for (int r = 1; r < rowCount; r++) {
	            Row row = sheet.getRow(r);
	            if (row == null) continue;
	            Cell emailCell = row.getCell(emailColIdx);
	            if (emailCell == null) continue;

	            String studentEmail = getCellValueAsString(emailCell).trim();
	            if (studentEmail.equalsIgnoreCase(email.trim())) {
	                // Aggregate attendance for each month
	                Map<String, int[]> monthStats = new java.util.LinkedHashMap<>();
	                for (int i = 0; i < monthYearHeaders.size(); i++) {
	                    String monthKey = monthYearHeaders.get(i);
	                    String value = getCellValueAsString(row.getCell(firstDateCol + i, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK)).toLowerCase();
	                    System.out.println("Col "+(firstDateCol + i)+", monthKey: " + monthKey + ", value: " + value);
						
						  if (monthKey == null || monthKey.isEmpty()) continue; 
						  if (!monthStats.containsKey(monthKey)) {
							    monthStats.put(monthKey, new int[]{0, 0});
							}
						  /*Cell attCell =
						 * row.getCell(firstDateCol + i, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
						 * String value = getCellValueAsString(attCell).toLowerCase(); if
						 * (!monthStats.containsKey(monthKey)) { // stats[0] = present, stats[1] = total
						 * monthStats.put(monthKey, new int[]{0, 0}); }
						 */
	                    int[] stats = monthStats.get(monthKey);
	                    if (value.equals("present")) stats[0]++;
	                    if (value.equals("present") || value.equals("absent")) stats[1]++;
	                }
	                // Prepare monthly results
	                List<Map<String, Object>> monthly = new ArrayList<>();
	                for (Map.Entry<String, int[]> e : monthStats.entrySet()) {
	                    int present = e.getValue()[0], total = e.getValue()[1];
	                    double percent = (total == 0) ? 0.0 : ((double)present / total) * 100.0;
	                    monthly.add(Map.of("month", e.getKey(), "percentage", String.format("%.2f", percent)));
	                }
	                return ResponseEntity.ok(Map.of("monthlyAttendance", monthly));
	            }
	        }
	        return ResponseEntity.status(404).body("No student found with email: " + email);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(500).body("Failed to read Excel: " + e.getMessage());
	    }
	}
	
	
	@GetMapping("/assignmentsByEmail")
	public ResponseEntity<?> getAssignmentsByEmail(@RequestParam String email) {
	    try (FileInputStream fis = new FileInputStream(STUDENTS_FILE_PATH);
	         Workbook workbook = new XSSFWorkbook(fis)) {

	        Sheet sheet = workbook.getSheetAt(0);

	        Row headerRow = sheet.getRow(0);
	        if (headerRow == null) return ResponseEntity.badRequest().body("Header row missing in Excel");

	        int emailColIdx = 2; // Column C: Email (0-based)
	        int assignmentStartCol = 7; // Column H: Assignment1 (0-based)
	        int attendanceStartCol = 9; // Column J: First attendance date (0-based)
	        int lastCol = headerRow.getLastCellNum();

	        // 1. Collect assignment headers (until attendance date columns)
	        List<String> assignmentHeaders = new ArrayList<>();
	        for (int i = assignmentStartCol; i < attendanceStartCol; i++) {
	            Cell c = headerRow.getCell(i);
	            String header = c == null ? "" : getCellValueAsString(c).trim();
	            if (!header.isEmpty()) assignmentHeaders.add(header);
	        }

	        int rowCount = sheet.getPhysicalNumberOfRows();
	        for (int r = 1; r < rowCount; r++) {
	            Row row = sheet.getRow(r);
	            if (row == null) continue;
	            Cell emailCell = row.getCell(emailColIdx);
	            if (emailCell == null) continue;

	            String studentEmail = getCellValueAsString(emailCell).trim();
	            if (studentEmail.equalsIgnoreCase(email.trim())) {
	                List<Map<String, Object>> assignments = new ArrayList<>();
	                for (int i = 0; i < assignmentHeaders.size(); i++) {
	                    Cell assgCell = row.getCell(assignmentStartCol + i, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
	                    String value = getCellValueAsString(assgCell).trim();
	                    double mark = 0.0;
	                    try { mark = Double.parseDouble(value); } catch (Exception ignore) {}
	                    assignments.add(Map.of(
	                        "assignment", assignmentHeaders.get(i),
	                        "marks", mark
	                    ));
	                }
	                return ResponseEntity.ok(Map.of("assignments", assignments));
	            }
	        }
	        return ResponseEntity.status(404).body("No student found with email: " + email);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(500).body("Failed to read Excel: " + e.getMessage());
	    }
	}

	
	
	
	
	
	
	private String getCellValueAsString(Cell cell) {
	    if (cell == null) return "";
	    switch (cell.getCellType()) {
	        case STRING:
	            return cell.getStringCellValue();
	        case NUMERIC:
	            if (DateUtil.isCellDateFormatted(cell)) {
	                return new SimpleDateFormat("dd/MM/yyyy").format(cell.getDateCellValue());
	            } else {
	                double d = cell.getNumericCellValue();
	                if (d == (long)d)
	                    return String.valueOf((long)d);
	                else
	                    return String.valueOf(d);
	            }
	        case BOOLEAN:
	            return String.valueOf(cell.getBooleanCellValue());
	        case FORMULA:
	            try {
	                return cell.getStringCellValue();
	            } catch (IllegalStateException e) {
	                double d = cell.getNumericCellValue();
	                return String.valueOf(d);
	            }
	        case BLANK:
	            return "";
	        default:
	            return cell.toString();
	    }
	}

	
	
	
	@GetMapping("/attendanceStatsByEmail")
	public ResponseEntity<?> getAttendanceStatsByEmail(@RequestParam String email) {
	    try (FileInputStream fis = new FileInputStream(STUDENTS_FILE_PATH);
	         Workbook workbook = new XSSFWorkbook(fis)) {

	        Sheet sheet = workbook.getSheetAt(0);
	        Row headerRow = sheet.getRow(0);
	        if (headerRow == null) return ResponseEntity.badRequest().body("Header row missing in Excel");

	        int emailColIdx = 2; // C
	        int firstDateCol = 9; // ATTENDANCE starts at col 9 (your debug confirms!)
	        int lastCol = headerRow.getLastCellNum();

	        int rowCount = sheet.getPhysicalNumberOfRows();
	        for (int r = 1; r < rowCount; r++) {
	            Row row = sheet.getRow(r);
	            if (row == null) continue;
	            Cell emailCell = row.getCell(emailColIdx);
	            if (emailCell == null) continue;
	            String studentEmail = getCellValueAsString(emailCell).trim();

	            if (studentEmail.equalsIgnoreCase(email.trim())) {
	                int present = 0, absent = 0, total = 0;
	                for (int i = firstDateCol; i < lastCol; i++) {
	                    Cell c = row.getCell(i, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
	                    String val = getCellValueAsString(c).trim().toLowerCase();
	                    System.out.println("Att col " + i + ": '" + val + "'"); // <-- debug row data

	                    if (val.equals("present")) { present++; total++; }
	                    else if (val.equals("absent")) { absent++; total++; }
	                    // skip others/blanks
	                }
	                System.out.println("Present: " + present + " Absent: " + absent + " Total: " + total);
	                return ResponseEntity.ok(Map.of(
	                    "totalDays", total,
	                    "present", present,
	                    "absent", absent
	                ));
	            }
	        }
	        return ResponseEntity.status(404).body("No student found with email: " + email);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(500).body("Failed to read Excel: " + e.getMessage());
	    }
	}

}
