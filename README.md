# Agent test harness

## 🏗️ **Architecture**:
- **Express server** with `/vetting` endpoint
- **LangChain AI agent** makes the decisions  
- **MCP (Model Context Protocol) server** provides tools

🔍 **How it works**:
1. POST `/vetting`
2. Agent calls MCP tools to check electoral roll & company records
3. Agent analyzes the data and decides, returning with pass / fail + reasoning

## **Vetting Scenarios:**

1. **✅ PASS: John Doe** - Found on electoral roll (exact match) + Active company appointments
   - Electoral Roll: ✅ Exact match, 10 years registration  
   - Companies House: ✅ Active appointment, no risk flags
   - **Expected: PASS**

2. **❌ FAIL: Jane Smith** - Found on electoral roll + Dissolved companies with risk flags
   - Electoral Roll: ✅ Exact match, 5 years registration
   - Companies House: ❌ Multiple dissolved companies, risk flags, disqualifications
   - **Expected: FAIL**

3. **✅ PASS: Bob Wilson** - Partial electoral roll match + Clean company record
   - Electoral Roll: ⚠️ Partial match (Robert Wilson), 2 years registration
   - Companies House: ✅ Active appointment, no risk flags  
   - **Result: PASS**

4. **❌ FAIL: Unknown Person** - Not found on electoral roll + Dissolved companies
   - Electoral Roll: ❌ No match found
   - Companies House: ❌ Dissolved companies, multiple risk flags
   - **Result: FAIL**

## **Matrix:**
| Electoral Roll | Companies House | Expected | Test Case |
|----------------|-----------------|----------|-----------|
| ✅ Exact Match | ✅ Active/Clean | PASS | John Doe |
| ✅ Exact Match | ❌ Dissolved/Risk | FAIL | Jane Smith |
| ⚠️ Partial Match | ✅ Active/Clean | PASS | Bob Wilson |
| ❌ No Match | ❌ Dissolved/Risk | FAIL | Unknown Person |
