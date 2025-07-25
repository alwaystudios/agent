interface VettingResult {
  pass: boolean;
  reason: string;
  summary: string;
}

export function cleanAndValidateOutput(rawOutput: string): { isValid: boolean; cleanedOutput: string } {
  let output = rawOutput;

  if (output.includes('```')) {
    output = output.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  }

  const jsonMatch = output.match(/\{[\s\S]*"pass"[\s\S]*\}/);
  if (jsonMatch) {
    output = jsonMatch[0];
  }

  try {
    const parsed: VettingResult = JSON.parse(output);
    if (typeof parsed.pass === 'boolean' && parsed.reason && parsed.summary) {
      return { isValid: true, cleanedOutput: output };
    }
  } catch (e) {
    return { isValid: false, cleanedOutput: output };
  }

  return { isValid: false, cleanedOutput: output };
} 