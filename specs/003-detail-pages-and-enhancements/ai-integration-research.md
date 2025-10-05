# AI Description Integration Research (Article V)

**Constitutional Requirement**: Article V - AI Enhancement must be build-time only, never runtime.

---

## Constitutional Compliance

### Article V: Progressive AI Enhancement

From the constitution:

> **Principle**: AI enhances but never blocks. Build-time only. Manual fallback always works.

**Requirements**:
1. ✅ AI runs during `npm run build`, never in browser
2. ✅ Manual description always required (never rely solely on AI)
3. ✅ Site works perfectly if AI service is down/unavailable
4. ✅ Artist can override AI-generated text by editing markdown
5. ✅ No runtime API calls (keeps deployment static and free)

---

## Proposed Implementation Strategy

### Build-Time AI Script

**File**: `scripts/generate-ai-descriptions.ts`

**When it runs**:
```json
{
  "scripts": {
    "prebuild": "node scripts/generate-ai-descriptions.js",
    "build": "astro build",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

**Flow**:
1. `npm run build` triggered (locally or in CI/CD)
2. `prebuild` script runs first automatically
3. Script reads all `.md` files in `src/content/pieces/`
4. For each piece:
   - Check if `aiDescription` field is empty/missing
   - If empty: Call Claude API to generate description
   - If API succeeds: Write description to frontmatter
   - If API fails: Log error, leave empty (manual description used instead)
5. `astro build` proceeds with updated markdown files

---

## API Integration Options

### Option 1: Claude API (Anthropic) - **RECOMMENDED**

**Pros**:
- High-quality, nuanced descriptions perfect for art
- Understands context and aesthetics well
- Can analyze images if we send them
- Official SDK available: `@anthropic-ai/sdk`

**Cons**:
- Costs money (but build-time = minimal usage)
- Requires API key (stored in `.env`)

**Pricing** (as of 2024):
- Claude 3 Haiku: $0.25 per million input tokens, $1.25 per million output tokens
- ~200 tokens per description = ~$0.0003 per piece
- **For 100 pieces: ~$0.03 total** (negligible)

**Example API Call**:
```javascript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const response = await anthropic.messages.create({
  model: "claude-3-haiku-20240307",
  max_tokens: 200,
  messages: [{
    role: "user",
    content: `You are an art critic writing for a pottery portfolio.

    Describe this ceramic piece in 2-3 sentences from an artistic perspective.
    Focus on form, technique, and aesthetic impact.

    Title: ${title}
    Techniques: ${techniques.join(', ')}
    Colors: ${colors.join(', ')}
    Textures: ${textures?.join(', ') || 'N/A'}
    Artist's Description: ${description}

    Write a complementary perspective that adds depth without repeating the artist's words.`
  }]
});

const aiDescription = response.content[0].text;
```

### Option 2: OpenAI GPT-4

**Pros**:
- Widely used, well-documented
- Multimodal (can analyze images)
- Good at creative writing

**Cons**:
- More generic tone than Claude for art
- Slightly higher cost
- Requires separate API key

### Option 3: Local LLM (Ollama)

**Pros**:
- Completely free
- No API keys needed
- Privacy-friendly (no data leaves machine)

**Cons**:
- Requires Ollama installed locally
- Quality varies by model
- Slower than cloud APIs
- Not available in CI/CD environments (GitHub Actions)

**Verdict**: Not suitable for this project (violates ease of deployment)

---

## Frontmatter Update Strategy

### Before AI (Manual Only)
```yaml
---
title: "Earth Vessel"
description: "Hand-built vessel inspired by ancient earthenware..."
aiDescription: ""
---
```

### After AI Script Runs
```yaml
---
title: "Earth Vessel"
description: "Hand-built vessel inspired by ancient earthenware..."
aiDescription: "This piece demonstrates remarkable control of slip decoration, with layered earth tones creating a visual depth reminiscent of geological strata. The organic form speaks to a deep understanding of hand-building techniques while maintaining contemporary sensibility."
---
```

### Update Method: gray-matter Library

**Install**: `npm install gray-matter`

**Code**:
```javascript
import fs from 'fs';
import matter from 'gray-matter';

// Read markdown file
const fileContent = fs.readFileSync(filePath, 'utf-8');
const { data, content } = matter(fileContent);

// Update aiDescription
data.aiDescription = aiGeneratedText;

// Write back to file
const updatedFile = matter.stringify(content, data);
fs.writeFileSync(filePath, updatedFile);
```

---

## Error Handling & Fallbacks

### Failure Scenarios

1. **No API Key**: Script logs warning, skips AI generation
2. **API Rate Limit**: Wait and retry (with exponential backoff)
3. **API Error**: Log error, skip this piece, continue with others
4. **Network Failure**: Timeout after 30s, skip AI, use manual description
5. **Invalid Response**: Validate AI text length/format, reject if bad

### Fallback Chain
```
AI Description Request
  └─> API Call
        ├─> Success → Use AI text
        ├─> Failure → Use manual description (always present)
        └─> Partial Success → Use what works, log issues
```

**Critical Point**: Site ALWAYS works because `description` field is required in schema.

---

## Artist Workflow

### Adding a New Piece (Without AI)
1. Create `piece-04-new-bowl.md` in `src/content/pieces/`
2. Fill frontmatter (title, date, techniques, description, etc.)
3. Leave `aiDescription: ""` empty
4. Run `npm run build` (AI generates description automatically)
5. Deploy

### Overriding AI Description
1. Open `piece-04-new-bowl.md`
2. Edit `aiDescription` field with custom text
3. AI script sees it's not empty, skips generation
4. Artist's text is used

### Disabling AI Entirely
1. Delete `.env` file (no API key)
2. Script skips AI generation gracefully
3. All pieces use manual descriptions

---

## Security & Privacy

### API Key Management
- **Storage**: `.env` file (gitignored)
- **CI/CD**: GitHub Secrets (ANTHROPIC_API_KEY)
- **Never**: Commit API key to repository
- **Rotation**: Change key if exposed

### Data Privacy
- Only metadata sent to API (title, techniques, colors, description)
- No personal information transmitted
- No user data (site is static, no users)
- Artist owns all generated content (saves to local files)

---

## Cost Analysis

### Scenario: 100 Pottery Pieces

**Assumptions**:
- 100 pieces total in portfolio
- Each piece needs ~200 token description
- Using Claude 3 Haiku ($0.25/$1.25 per million tokens)

**Calculation**:
```
Input per piece: ~150 tokens (prompt + metadata)
Output per piece: ~200 tokens (description)

Total input: 100 × 150 = 15,000 tokens = 0.015M tokens
Total output: 100 × 200 = 20,000 tokens = 0.02M tokens

Cost:
  Input: 0.015M × $0.25 = $0.00375
  Output: 0.02M × $1.25 = $0.025
  Total: ~$0.03 (3 cents)
```

**Incremental Build**:
- Rebuilding site doesn't regenerate AI (only empty `aiDescription` fields get filled)
- Adding 10 new pieces = ~$0.003 (0.3 cents)

**Annual Cost** (assuming 50 new pieces/year): **$0.015 (~1.5 cents)**

---

## Implementation Timeline

### Feature 003 (Current): Preparation Only
- ✅ Add `aiDescription` field to schema (already exists)
- ✅ Detail page template supports AI content section
- ✅ Documentation for future integration
- ❌ **No API integration yet** (deferred)

### Feature 004 or 005 (Future): Full AI Integration
- Install `@anthropic-ai/sdk` and `gray-matter`
- Create `scripts/generate-ai-descriptions.ts`
- Add `prebuild` script to `package.json`
- Document API key setup in README
- Test with 1-2 pieces first
- Roll out to all pieces

**Reason for Deferral**:
- Focus Feature 003 on core functionality (detail pages, filtering, gallery)
- AI is "nice to have" enhancement, not blocker
- Allows more time for testing AI prompts and quality
- Keeps Feature 003 scope manageable

---

## Alternative Approaches (Rejected)

### ❌ Runtime AI (Violates Article V)
- Call API when user visits detail page
- **Rejected**: Breaks static site model, costs money per visitor, slow, requires serverless functions

### ❌ Pre-commit Hook
- Generate AI descriptions when artist commits markdown
- **Rejected**: Requires git hook setup (complexity), may fail silently, not observable

### ❌ Manual Copy-Paste from Claude.ai
- Artist uses Claude website, copies text manually
- **Rejected**: Tedious, error-prone, defeats automation purpose

### ❌ AI in Astro Component (SSR/SSG)
- Call API during Astro page render
- **Rejected**: Still runtime in build, harder to debug, couples content to build process

---

## Testing Strategy for AI Integration (Future)

### Unit Tests
- [ ] Script reads markdown files correctly
- [ ] Frontmatter parsing works
- [ ] AI API call mock returns expected format
- [ ] Frontmatter update writes correctly
- [ ] Empty `aiDescription` triggers generation
- [ ] Non-empty `aiDescription` is preserved

### Integration Tests
- [ ] `npm run prebuild` completes successfully
- [ ] Generated descriptions appear in built site
- [ ] Manual descriptions used when AI fails (mock API failure)
- [ ] Build succeeds even if API key missing

### Manual Testing
- [ ] Generate descriptions for 3 test pieces
- [ ] Review AI quality (does it sound good?)
- [ ] Test override (manually edit, ensure it sticks)
- [ ] Test rebuild (ensure descriptions persist)

---

## Documentation for Artist

**Guide**: `docs/ai-descriptions.md` (to be created in Feature 004/005)

### Quick Start
```bash
# 1. Get API key from Anthropic
# Visit: https://console.anthropic.com/

# 2. Add to .env file
echo "ANTHROPIC_API_KEY=your_key_here" > .env

# 3. Build site (AI runs automatically)
npm run build

# 4. Check generated descriptions
# Open pieces in src/content/pieces/ and look for aiDescription field
```

### Customizing AI Descriptions
```markdown
---
title: "My Bowl"
description: "A beautiful bowl..."
aiDescription: "This bowl showcases..." # ← AI generated this
---
```

To customize:
1. Edit the `aiDescription` field directly
2. Save file
3. Next build will skip AI for this piece (keeps your edit)

---

## Conclusion

**For Feature 003**: Prepare structure, defer implementation
**For Feature 004/005**: Full AI integration with Claude API

**Estimated Effort** (for full AI integration):
- Implementation: 4-6 hours
- Testing: 2-3 hours
- Documentation: 1-2 hours
- **Total**: 7-11 hours

**Constitutional Compliance**: ✅ Build-time only, manual fallback, artist control

---

**Status**: Research complete, ready for future implementation
**Dependencies**: None (can be added anytime after Feature 003)
