import type { Category } from '../types';

export const categorizeEvent = (title: string, notes: string = ''): Category => {
    const content = `${title.toLowerCase()} ${notes.toLowerCase()}`;

    const workKeywords = {
        strong: ['deadline', 'client', 'sprint'], // 2 points
        regular: ['meeting', 'project', 'work', 'presentation'], // 1 point
    };

    const personalKeywords = {
        strong: ['birthday', 'wedding', 'anniversary'], // 2 points
        regular: ['family', 'doctor', 'party', 'gym', 'personal'], // 1 point
    };

    let workScore = 0;
    let personalScore = 0;

    // Calculating work score
    workKeywords.strong.forEach(keyword => {
        if (content.includes(keyword)) workScore += 2;
    });
    workKeywords.regular.forEach(keyword => {
        if (content.includes(keyword)) workScore += 1;
    });

    // Calculating personal score
    personalKeywords.strong.forEach(keyword => {
        if (content.includes(keyword)) personalScore += 2;
    });
    personalKeywords.regular.forEach(keyword => {
        if (content.includes(keyword)) personalScore += 1;
    });

    // Determine category based on score
    if (workScore > personalScore) {
        return 'Work';
    }
    if (personalScore > workScore) {
        return 'Personal';
    }
    if (workScore > 0 && workScore === personalScore) {
        // If scores are tied and not zero, default to Work
        return 'Work';
    }

    return 'Other';
};