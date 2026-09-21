# -*- coding: utf-8 -*-
"""Parti condivise dalle guide: catalogo, pagina introduttiva, pagina finale."""
from design import *

EDITION = 'Edizione 1.0  ·  Settembre 2026'
TAGLINE = 'Riservata ai Percorsi personalizzati  ·  @gustoscopio'

# Il catalogo riflette src/guide.js (stessi id): se cambi un titolo, cambialo in entrambi.
CATALOG = {
    'guida-proteine': {
        'number': '1', 'title': 'Proteine: la guida pratica', 'short': 'Proteine: la guida pratica',
        'cover': ['Proteine,', 'la guida', 'pratica'],
        'subtitle': 'Quante ne servono, dove trovarle, come distribuirle nella giornata. Con i numeri veri.',
    },
    'guida-piatto-bilanciato': {
        'number': '2', 'title': 'Il piatto bilanciato', 'short': 'Il piatto bilanciato',
        'cover': ['Il piatto', 'bilanciato'],
        'subtitle': 'Il metodo del piatto e le porzioni, per mangiare bene senza pesare tutto.',
    },
    'guida-spesa-etichette': {
        'number': '3', 'title': 'La spesa intelligente', 'short': 'La spesa intelligente',
        'cover': ['La spesa', 'intelligente'],
        'subtitle': 'Leggere le etichette, riempire la dispensa, uscire dal supermercato con le idee chiare.',
    },
    'guida-fabbisogno': {
        'number': '4', 'title': 'Il tuo fabbisogno', 'short': 'Il tuo fabbisogno',
        'cover': ['Il tuo', 'fabbisogno'],
        'subtitle': "Come si stima l'energia che ti serve, cosa cambia con l'attività e come usare il numero senza farne un'ossessione.",
    },
    'guida-colazione-spuntini': {
        'number': '5', 'title': 'Colazione e spuntini', 'short': 'Colazione e spuntini',
        'cover': ['Colazione', 'e spuntini'],
        'subtitle': 'Idee bilanciate costruite su ricette reali: veloci, che saziano e facili da ripetere.',
    },
    'guida-settimana': {
        'number': '6', 'title': 'Organizzare la settimana', 'short': 'Organizzare la settimana',
        'cover': ['Organizzare', 'la settimana'],
        'subtitle': 'Pianificare i pasti, cucinare in anticipo, fare una lista della spesa che regge.',
    },
    'guida-idratazione': {
        'number': '7', 'title': 'Idratazione', 'short': 'Idratazione',
        'cover': ['Idratazione,', 'senza', 'complicazioni'],
        'subtitle': 'Quanta acqua serve davvero, come cambia con attività e caldo, cosa conta come liquido.',
    },
}

# Ingredienti di MARCA presenti nel database: le guide non li usano mai (neutralità).
BRAND_FOOD_IDS = {
    'crackers-galbusera-magretti', 'gallette-fiorentini-super-protein', 'kefir-pro-high-protein',
    'marmellata-light', 'mozzarella-protein', 'pasta-barilla-protein-plus', 'philadelphia-light',
    'philadelphia-protein', 'ricotta-proteica-lidl', 'riso-soffiato-kelloggs', 'yogurt-hipro-danone',
}


def clean_recipes(D):
    """Ricette senza ingredienti di marca."""
    return [r for r in D.recipes.values() if not any(i['foodId'] in BRAND_FOOD_IDS for i in r['ingredients'])]


DISCLAIMER = (
    'Le informazioni di questa guida hanno scopo divulgativo: non sono un parere medico e non sostituiscono '
    'la valutazione di un professionista. Se sei in gravidanza o allattamento, hai una patologia (per esempio '
    'renale, metabolica o gastrointestinale), segui una terapia, hai o hai avuto un disturbo del comportamento '
    'alimentare, oppure la guida riguarda un minore o una persona fragile, confrontati con il tuo medico o con '
    'un professionista della nutrizione prima di cambiare alimentazione.'
)

DATA_NOTE = (
    'I valori nutrizionali provengono dal database di Gustoscopio: sono valori di riferimento medi (stile '
    'USDA/CREA), espressi per 100 g di alimento. Quelli reali cambiano con marca, ricetta, cottura e stato '
    '(crudo o cotto). Considerali un ordine di grandezza affidabile, non una misura di laboratorio.'
)


def cover(key):
    g = CATALOG[key]
    return [
        Cover(g['number'], 'GUIDA ESCLUSIVA', g['cover'], g['subtitle'], EDITION, TAGLINE),
        NextPageTemplate('body'), PageBreak(),
    ]


def intro_page(chapters, how_to_use):
    """Pagina 2: indice + come usare la guida + avvertenze."""
    story = [
        Chapter('', 'Indice', kicker='SOMMARIO', dark=False, toc=False),
        make_toc(),
        Spacer(1, 4 * mm),
        P('Come usare questa guida', 'h2'),
    ]
    story += bullets(how_to_use)
    story += [
        Spacer(1, 3 * mm),
        Callout('note', DISCLAIMER, title='PRIMA DI INIZIARE'),
        Spacer(1, 3 * mm),
        Callout('note', DATA_NOTE, title='SUI NUMERI'),
    ]
    return story


class ClosingPage(Flowable):
    """Ultima pagina: sfondo scuro a tutta pagina, tre passi e un accenno (morbido) ai Percorsi."""

    def __init__(self, steps, others, fine_print):
        super().__init__()
        self.steps, self.others, self.fine = steps, others, fine_print

    def wrap(self, aw, ah):
        self.aw, self.ah = aw, ah
        return aw, ah - 2

    def draw(self):
        c = self.canv
        ox, oy = -MARGIN_X, -MARGIN_BOTTOM
        c.saveState()
        c.setFillColor(NIGHT)
        c.rect(ox, oy, PAGE_W, PAGE_H, stroke=0, fill=1)
        cx, cy = PAGE_W - MARGIN_X - 22 * mm, PAGE_H - MARGIN_BOTTOM - 38 * mm  # relativi al frame
        c.setStrokeColor(BLUE)
        for i, r in enumerate(range(18, 120, 20)):
            c.setLineWidth(0.7)
            c.setStrokeAlpha(max(0.05, 0.55 - i * 0.09))
            c.circle(cx, cy, r * mm * 0.9, stroke=1, fill=0)
        c.setStrokeAlpha(1)
        c.restoreState()

        y = self.ah - 6 * mm
        spaced(c, 0, y, 'PER FINIRE', 'BodyXB', 7.6, 1.6, BLUE)
        y -= 16 * mm
        c.setFillColor(WHITE)
        c.setFont('SerifB', 44)
        c.drawString(0, y, 'E adesso?')
        y -= 10 * mm
        intro = Paragraph('Una guida serve se la usi. Tre modi per farlo, dal più semplice.', ParagraphStyle(
            'ci', fontName='Serif', fontSize=15, leading=20, textColor=colors.HexColor('#D5D8E3')))
        w, h = intro.wrap(self.aw - 30 * mm, 100)
        intro.drawOn(c, 0, y - h)
        y -= h + 12 * mm

        for i, (title, text) in enumerate(self.steps, 1):
            c.setFillColor(BLUE)
            c.setFont('SerifB', 30)
            c.drawString(0, y - 8, str(i))
            c.setFillColor(WHITE)
            c.setFont('BodyBold', 10.5)
            c.drawString(13 * mm, y - 3, title)
            p = Paragraph(text, ParagraphStyle('cp', fontName='Body', fontSize=9.2, leading=14,
                                               textColor=colors.HexColor('#C9CCD9')))
            w, h = p.wrap(self.aw - 13 * mm - 12 * mm, 200)
            p.drawOn(c, 13 * mm, y - 6 - h)
            y -= h + 19 * mm

        # accenno morbido ai Percorsi
        box_h = 25 * mm
        c.setFillColor(colors.HexColor('#1A1E2B'))
        c.roundRect(0, 15 * mm, self.aw, box_h, 3 * mm, stroke=0, fill=1)
        pp = Paragraph(
            "<font name='BodyBold' color='#FFFFFF'>Una guida dei Percorsi personalizzati.</font> "
            "Fa parte del materiale riservato a chi segue un percorso con Gustoscopio: se qualcosa non ti torna, "
            "chiedilo direttamente a chi ti segue. Nessuna fretta: questa guida resta tua.",
            ParagraphStyle('cb', fontName='Body', fontSize=8.8, leading=13.4, textColor=colors.HexColor('#C9CCD9')))
        w, h = pp.wrap(self.aw - 12 * mm, 100)
        pp.drawOn(c, 6 * mm, 15 * mm + (box_h - h) / 2)
        c.setFillColor(colors.HexColor('#8A8EA0'))
        c.setFont('Body', 6.8)
        c.drawString(0, 8.5 * mm, self.fine)


def closing(key, steps):
    others = []  # nessun elenco di altre guide: resta valido anche quando ne aggiungiamo di nuove
    fine = ('Uso personale, riservato a chi ha un percorso attivo. Non può essere copiata, rivenduta o ridistribuita.  ·  '
            'Informazioni a scopo divulgativo.')
    return [PageBreak(), ClosingPage(steps, others, fine)]
