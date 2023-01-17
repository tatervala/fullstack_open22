const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / (height / 100) ** 2;
  
    if (bmi >= 16 && bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 25) return "Normal (healthy weight)";
    if (bmi >= 25 && bmi < 30) return "Overweight";
  };
  
  console.log(calculateBmi(180, 74));