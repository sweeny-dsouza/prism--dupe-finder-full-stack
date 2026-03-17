export interface BodyConcern {
    id: string;
    name: string;
    explanation: string;
    recommendedProductIds: string[];
}

export const bodyConcerns: BodyConcern[] = [
    {
        id: 'strawberry-legs',
        name: 'Strawberry Legs (KP)',
        explanation: 'Caused by clogged pores or Keratosis Pilaris. Chemical and physical exfoliation help smooth the bumps by removing dead skin and excess keratin.',
        recommendedProductIds: ['bc005', 'bc047', 'bc015', 'bc019'] // Sprubs and ubtans
    },
    {
        id: 'fungal-back-acne',
        name: 'Back Acne (Bacne)',
        explanation: 'Often caused by sweat and bacteria. Ingredients like Salicylic Acid or Tea Tree Oil help deep clean pores and reduce inflammation.',
        recommendedProductIds: ['bc016', 'bc034', 'bc042', 'bc050'] // Cleansers with SA/Tea Tree
    },
    {
        id: 'rough-texture',
        name: 'Rough Texture',
        explanation: 'Dry, flaky skin needs a combination of exfoliation and deep moisture to restore a smooth, silky surface.',
        recommendedProductIds: ['bc004', 'bc012', 'bc041', 'bc045'] // Rich creams
    },
    {
        id: 'uneven-tone',
        name: 'Uneven Tone / Tanning',
        explanation: 'Sun exposure or scarring can leave skin looking dull. Brightening agents like Vitamin C, Niacinamide, or Turmeric help even out the skin tone.',
        recommendedProductIds: ['bc006', 'bc013', 'bc046', 'bc050'] // Brightening oils/lotions
    },
    {
        id: 'body-blemishes',
        name: 'Body Blemishes',
        explanation: 'Target dark spots and post-inflammatory hyperpigmentation on the body with clarifying and reparative actives.',
        recommendedProductIds: ['bc013', 'bc046', 'bc037'] // Serums and clarifying oils
    }
];
