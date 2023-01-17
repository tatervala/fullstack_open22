interface values {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}
const calculateExercises = (times: Array<number>, target: number): values => {
    const periodLength = times.length
    const trainingDays = times.filter(i => i > 0).length
    const average = times.reduce((a, b) => a + b) / periodLength
    const success = times.every(e => e >= target)
    let rating;
    let ratingDescription;
    if (trainingDays >= periodLength) {
        rating = 3;
        ratingDescription = 'Really Good!'
    } else if (trainingDays >= periodLength / 2) {
        rating = 2
        ratingDescription = 'not too bad but could do better'
    } else {    
        rating = 1
        ratingDescription = 'try harder next time' 
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
      };
}
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))