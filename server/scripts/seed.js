const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, '..', 'database', 'prism.sqlite');
const db = new sqlite3.Database(dbPath);

const initDb = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('DROP TABLE IF EXISTS products');
            db.run('DROP TABLE IF EXISTS ingredients');
            db.run('DROP TABLE IF EXISTS concerns');

            db.run(`CREATE TABLE products (
                id TEXT PRIMARY KEY,
                name TEXT,
                brand TEXT,
                category TEXT,
                subcategory TEXT,
                price REAL,
                currency TEXT,
                originalPrice REAL,
                ingredients TEXT,
                keyIngredients TEXT,
                benefits TEXT,
                concerns TEXT,
                skinType TEXT,
                hairType TEXT,
                bodyRoutineStep TEXT,
                texture TEXT,
                finish TEXT,
                rating REAL,
                reviewCount INTEGER,
                tags TEXT,
                imageUrl TEXT,
                description TEXT,
                isLuxury BOOLEAN,
                budgetLevel TEXT,
                dupeOf TEXT
            )`);

            db.run(`CREATE TABLE ingredients (
                id TEXT PRIMARY KEY,
                name TEXT,
                benefits TEXT,
                concerns TEXT,
                suitableFor TEXT,
                avoidIf TEXT,
                scientificSummary TEXT,
                commonIn TEXT
            )`);

            db.run(`CREATE TABLE concerns (
                id TEXT PRIMARY KEY,
                name TEXT,
                description TEXT,
                recommendedIngredients TEXT,
                avoidIngredients TEXT,
                recommendedProductIds TEXT,
                type TEXT
            )`, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    });
};

const extractArray = (content, variableName) => {
    console.log(`Extracting ${variableName}...`);
    // Find the variable name and then the first opening bracket [
    const varIndex = content.indexOf(variableName);
    if (varIndex === -1) {
        console.warn(`Variable ${variableName} not found`);
        return null;
    }
    
    const startIndex = content.indexOf('[', varIndex);
    if (startIndex === -1) {
        console.warn(`Opening bracket for ${variableName} not found`);
        return null;
    }
    
    let bracketCount = 0;
    let endIndex = -1;
    for (let i = startIndex; i < content.length; i++) {
        if (content[i] === '[') bracketCount++;
        else if (content[i] === ']') bracketCount--;
        
        if (bracketCount === 0) {
            endIndex = i;
            break;
        }
    }
    
    if (endIndex === -1) {
        console.warn(`Closing bracket for ${variableName} not found`);
        return null;
    }
    
    const arrayStr = content.substring(startIndex, endIndex + 1);
    
    try {
        // Remove trailing comma if it exists before ] to satisfy some environments
        // and remove comments
        const cleanStr = arrayStr.replace(/\/\/.*$/gm, '').replace(/,\s*\]$/, ']');
        return new Function(`return ${cleanStr}`)();
    } catch (e) {
        console.error(`Error parsing ${variableName}:`, e.message);
        return null;
    }
};

const insertProduct = (product) => {
    const query = `
        INSERT INTO products (
            id, name, brand, category, subcategory, price, currency, originalPrice,
            ingredients, keyIngredients, benefits, concerns, skinType, hairType,
            bodyRoutineStep, texture, finish, rating, reviewCount, tags, imageUrl,
            description, isLuxury, budgetLevel, dupeOf
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.run(query, [
            product.id, product.name, product.brand, product.category, product.subcategory,
            product.price || 0, product.currency || 'INR', product.originalPrice || null,
            JSON.stringify(product.ingredients || []),
            JSON.stringify(product.keyIngredients || []),
            JSON.stringify(product.benefits || []),
            JSON.stringify(product.concerns || []),
            product.skinType || null,
            JSON.stringify(product.hairType || []),
            product.bodyRoutineStep || null, 
            product.texture || null, 
            product.finish || null,
            product.rating || 0, product.reviewCount || 0,
            JSON.stringify(product.tags || []),
            product.imageUrl || '', 
            product.description || '',
            product.isLuxury ? 1 : 0, product.budgetLevel || 'low', product.dupeOf || null
        ], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

const insertIngredient = (ing) => {
    const query = `
        INSERT INTO ingredients (id, name, benefits, concerns, suitableFor, avoidIf, scientificSummary, commonIn)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.run(query, [
            ing.id, ing.name,
            JSON.stringify(ing.benefits || []),
            JSON.stringify(ing.concerns || []),
            JSON.stringify(ing.suitableFor || []),
            JSON.stringify(ing.avoidIf || []),
            ing.scientificSummary || '',
            JSON.stringify(ing.commonIn || [])
        ], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

const insertConcern = (concern, type) => {
    const query = `
        INSERT INTO concerns (id, name, description, recommendedIngredients, avoidIngredients, recommendedProductIds, type)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.run(query, [
            concern.id, concern.name, concern.description || concern.explanation || '',
            JSON.stringify(concern.recommendedIngredients || []),
            JSON.stringify(concern.avoidIngredients || []),
            JSON.stringify(concern.recommendedProductIds || []),
            type
        ], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

async function seed() {
    try {
        console.log('--- Database Seeding Started ---');
        await initDb();
        console.log('1. Database initialized.');

        const baseDir = path.resolve(__dirname, '..', '..', 'app', 'src', 'data');

        // Products migration
        const files = [
            { file: 'skincareProducts.ts', var: 'skincareProducts' },
            { file: 'haircareProducts.ts', var: 'haircareProducts' },
            { file: 'bodycareProducts.ts', var: 'bodycareProducts' }
        ];
        
        for (const f of files) {
            const content = fs.readFileSync(path.join(baseDir, f.file), 'utf8');
            const data = extractArray(content, f.var);
            if (data) {
                console.log(`- Migrating ${data.length} products from ${f.file}...`);
                for (const p of data) await insertProduct(p);
            }
        }

        // Ingredients & General Concerns
        const productsContent = fs.readFileSync(path.join(baseDir, 'products.ts'), 'utf8');
        const ingredients = extractArray(productsContent, 'ingredients');
        if (ingredients) {
            console.log(`- Migrating ${ingredients.length} ingredients...`);
            for (const ing of ingredients) await insertIngredient(ing);
        }
        
        const skinConcerns = extractArray(productsContent, 'skinConcerns');
        if (skinConcerns) {
            console.log(`- Migrating ${skinConcerns.length} skin concerns...`);
            for (const sc of skinConcerns) await insertConcern(sc, 'skin');
        }
        
        const hairConcerns = extractArray(productsContent, 'hairConcerns');
        if (hairConcerns) {
            console.log(`- Migrating ${hairConcerns.length} hair concerns...`);
            for (const hc of hairConcerns) await insertConcern(hc, 'hair');
        }

        // Body Concerns
        try {
            const bodyConcernsContent = fs.readFileSync(path.join(baseDir, 'bodyConcerns.ts'), 'utf8');
            const bodyConcernsData = extractArray(bodyConcernsContent, 'bodyConcerns');
            if (bodyConcernsData) {
                console.log(`- Migrating ${bodyConcernsData.length} body concerns...`);
                for (const bc of bodyConcernsData) await insertConcern(bc, 'body');
            }
        } catch (e) {
            console.warn('Skipping body concerns due to file error');
        }

        console.log('--- Seeding Completed successfully ---');
        db.close();
    } catch (e) {
        console.error('Seeding failed:', e);
        if (db) db.close();
        process.exit(1);
    }
}

seed();
