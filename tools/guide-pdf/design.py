# -*- coding: utf-8 -*-
"""
Design system delle guide PDF Gustoscopio.

Regole di brand (dal progetto):
- 70% chiaro / 20% scuro / 8% blu / 2% rosso. Il rosso è un accento raro.
- Cormorant Garamond per i titoli, Manrope per il testo.
- Mai "buono/cattivo", mai urgenza artificiale, mai valori nutrizionali scritti a mano
  (tutti i numeri arrivano da data.json, esportato dai file reali in src/).
"""
import json
import math
import os

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT, TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, PageBreak, Table,
    TableStyle, Flowable, KeepTogether, CondPageBreak, NextPageTemplate,
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.lib.fonts import addMapping

HERE = os.path.dirname(os.path.abspath(__file__))

# ------------------------------------------------------------------ colori
BLUE = colors.HexColor('#3155FF')
RED = colors.HexColor('#C94B3C')
OFF = colors.HexColor('#F8F7F3')
NIGHT = colors.HexColor('#10131C')
WHITE = colors.white
MUTED = colors.HexColor('#575A68')
LINE = colors.HexColor('#DEDFE3')
BLUE_TINT = colors.HexColor('#EEF1FF')
RED_TINT = colors.HexColor('#FBEFED')
SAND = colors.HexColor('#F1EFE8')
BLUE_SOFT = colors.HexColor('#A9B8FF')  # secondo tono per i grafici

# ------------------------------------------------------------------ font
FONT_DIR = os.path.join(HERE, 'fonts')
_FONTS = {
    'Body': 'Manrope-Regular', 'BodySemi': 'Manrope-SemiBold',
    'BodyBold': 'Manrope-Bold', 'BodyXB': 'Manrope-ExtraBold',
    'Serif': 'Cormorant-Medium', 'SerifSB': 'Cormorant-SemiBold',
    'SerifB': 'Cormorant-Bold', 'SerifI': 'Cormorant-MediumItalic',
    'SerifSBI': 'Cormorant-SemiBoldItalic',
}
for _name, _file in _FONTS.items():
    pdfmetrics.registerFont(TTFont(_name, os.path.join(FONT_DIR, _file + '.ttf')))
pdfmetrics.registerFontFamily('Body', normal='Body', bold='BodyBold', italic='BodySemi', boldItalic='BodyBold')
pdfmetrics.registerFontFamily('Serif', normal='Serif', bold='SerifB', italic='SerifI', boldItalic='SerifSBI')

# ------------------------------------------------------------------ pagina
PAGE_W, PAGE_H = A4
MARGIN_X = 20 * mm
MARGIN_TOP = 20 * mm
MARGIN_BOTTOM = 22 * mm
CONTENT_W = PAGE_W - 2 * MARGIN_X

# ------------------------------------------------------------------ stili
def _ps(name, **kw):
    base = dict(fontName='Body', fontSize=9.6, leading=15, textColor=NIGHT, alignment=TA_LEFT,
                allowWidows=0, allowOrphans=0)
    base.update(kw)
    return ParagraphStyle(name, **base)

STYLES = {
    'body': _ps('body', spaceAfter=6),
    'lead': _ps('lead', fontName='Serif', fontSize=15.5, leading=21, textColor=NIGHT, spaceAfter=10),
    'h2': _ps('h2', fontName='SerifSB', fontSize=20, leading=23, spaceBefore=14, spaceAfter=5, keepWithNext=1),
    'h3': _ps('h3', fontName='BodyBold', fontSize=8, leading=11, textColor=BLUE, spaceBefore=10, spaceAfter=3, keepWithNext=1),
    'small': _ps('small', fontSize=8, leading=11.5, textColor=MUTED, spaceAfter=4),
    'tiny': _ps('tiny', fontSize=7.2, leading=10, textColor=MUTED),
    'bullet': _ps('bullet', leftIndent=13, bulletIndent=2, spaceAfter=3.5, bulletFontName='BodyBold', bulletColor=BLUE),
    'cell': _ps('cell', fontSize=8.4, leading=11.2),
    'cellb': _ps('cellb', fontName='BodyBold', fontSize=8.4, leading=11.2),
    'cellr': _ps('cellr', fontSize=8.4, leading=11.2, alignment=TA_RIGHT),
    'cellrb': _ps('cellrb', fontName='BodyBold', fontSize=8.4, leading=11.2, alignment=TA_RIGHT),
    'cellc': _ps('cellc', fontSize=8.4, leading=11.2, alignment=TA_CENTER),
    'th': _ps('th', fontName='BodyBold', fontSize=7, leading=9, textColor=WHITE),
    'thr': _ps('thr', fontName='BodyBold', fontSize=7, leading=9, textColor=WHITE, alignment=TA_RIGHT),
    'group': _ps('group', fontName='BodyBold', fontSize=7.4, leading=10, textColor=BLUE),
    'callout': _ps('callout', fontSize=9.2, leading=14, spaceAfter=3),
    'callout_dark': _ps('callout_dark', fontSize=9.4, leading=14.5, textColor=colors.HexColor('#E9EAF0'), spaceAfter=3),
    'quote': _ps('quote', fontName='SerifSBI', fontSize=17, leading=22, textColor=WHITE),
}


def P(text, style='body'):
    return Paragraph(text, STYLES[style])


def bullets(items, style='bullet'):
    return [Paragraph(t, STYLES[style], bulletText='•') for t in items]


def esc(s):
    return str(s).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def fmt(x, d=1):
    """Numero in formato italiano (virgola). Niente decimali inutili."""
    if x is None:
        return '–'
    r = round(float(x), d)
    if abs(r - round(r)) < 1e-9:
        return str(int(round(r)))
    return f'{r:.{d}f}'.replace('.', ',')


# ------------------------------------------------------------------ dati
class Data:
    """Accesso ai dati reali del progetto (data.json)."""

    def __init__(self, path=None):
        path = path or os.path.join(HERE, 'data.json')
        with open(path, encoding='utf-8') as f:
            d = json.load(f)
        self.foods = {x['id']: x for x in d['foods']}
        self.recipes = {x['id']: x for x in d['recipes']}
        self.portion_ref = d['portionRef']
        self.activity_levels = d['activityLevels']
        self.protein_table = d['proteinTable']
        self.energy_table = d['energyTable']
        self.water_table = d['waterTable']

    def food(self, fid):
        if fid not in self.foods:
            raise KeyError(f'Alimento inesistente nel database: {fid}')
        return self.foods[fid]

    def calc(self, fid, grams):
        """Stessa logica di calc() in src/foods.js."""
        f = self.food(fid)
        k = grams / 100.0
        return {
            'kcal': round(f['kcal'] * k), 'protein': round(f['protein'] * k, 1),
            'carbs': round(f['carbs'] * k, 1), 'fat': round(f['fat'] * k, 1),
            'fiber': round(f['fiber'] * k, 1),
        }

    def meal(self, parts):
        """parts = [(foodId, grammi), ...] -> totali calcolati dal database."""
        tot = {'kcal': 0, 'protein': 0.0, 'carbs': 0.0, 'fat': 0.0, 'fiber': 0.0}
        for fid, g in parts:
            c = self.calc(fid, g)
            for k in tot:
                tot[k] += c[k]
        return {k: (round(v, 1) if k != 'kcal' else int(v)) for k, v in tot.items()}

    def recipe(self, rid):
        if rid not in self.recipes:
            raise KeyError(f'Ricetta inesistente: {rid}')
        return self.recipes[rid]


# ------------------------------------------------------------------ componenti base

def spaced(c, x, y, text, font, size, charspace, color):
    """Testo con spaziatura tra le lettere (per i kicker in maiuscolo)."""
    c.saveState()  # il charSpace appartiene allo stato grafico: va isolato
    t = c.beginText(x, y)
    t.setFont(font, size)
    t.setFillColor(color)
    t.setCharSpace(charspace)
    t.textOut(text)
    c.drawText(t)
    c.restoreState()

class Rule(Flowable):
    def __init__(self, width=None, color=LINE, thickness=0.6, space_before=4, space_after=8):
        super().__init__()
        self.w, self.color, self.t = width, color, thickness
        self.sb, self.sa = space_before, space_after

    def wrap(self, aw, ah):
        self.width = self.w or aw
        return self.width, self.sb + self.sa + self.t

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.t)
        self.canv.line(0, self.sa, self.width, self.sa)


class Chapter(Flowable):
    """Apertura di capitolo: fascia scura a tutta larghezza con numero e titolo."""

    def __init__(self, number, title, kicker='CAPITOLO', dark=True, toc_text=None, toc=True):
        super().__init__()
        self.number, self.title, self.kicker, self.dark = number, title, kicker, dark
        self._toc = (0, esc(toc_text or title)) if toc else None
        self._title_style = ParagraphStyle(
            'chtitle', fontName='SerifB', fontSize=31, leading=33,
            textColor=WHITE if dark else NIGHT)

    def wrap(self, aw, ah):
        self.aw = aw
        self._p = Paragraph(esc(self.title), self._title_style)
        _, ph = self._p.wrap(aw - 34 * mm, 200)
        self.band_h = max(42 * mm, ph + 30 * mm)
        self.height = self.band_h + 8 * mm
        return aw, self.height

    def draw(self):
        c = self.canv
        top_extra = MARGIN_TOP  # la fascia arriva fino al bordo alto della pagina
        y0 = 8 * mm  # base della fascia; sotto restano 8 mm di respiro
        if self.dark:
            c.saveState()
            c.setFillColor(NIGHT)
            c.rect(-MARGIN_X, y0, PAGE_W, self.band_h + top_extra, stroke=0, fill=1)
            # alone blu decorativo (richiamo al "cerchio" del brand)
            c.setStrokeColor(BLUE)
            c.setLineWidth(0.7)
            for i, r in enumerate((26, 40, 54)):
                c.setStrokeAlpha(0.55 - i * 0.14)
                c.circle(self.aw - 8 * mm, y0 + self.band_h - 6 * mm, r * mm * 0.62, stroke=1, fill=0)
            c.restoreState()
        # numero
        spaced(c, 0, y0 + self.band_h - 9 * mm, f'{self.kicker} {self.number}', 'BodyXB', 7.6, 1.6, BLUE)
        # titolo
        self._p.drawOn(c, 0, y0 + 8 * mm)
        if not self.dark:
            c.setStrokeColor(NIGHT)
            c.setLineWidth(1.2)
            c.line(0, y0 + 3 * mm, 26 * mm, y0 + 3 * mm)


class Callout(Flowable):
    """Riquadro con barra colorata. kind: quick | myth | note | tip | dark."""
    KINDS = {
        'quick': ('IN BREVE', BLUE_TINT, BLUE, BLUE),
        'myth': ('MITO O VERITÀ', RED_TINT, RED, RED),
        'note': ('NOTA', SAND, NIGHT, MUTED),
        'tip': ('IN PRATICA', BLUE_TINT, BLUE, BLUE),
        'dark': ('', NIGHT, BLUE, BLUE_SOFT),
    }

    def __init__(self, kind, content, title=None):
        super().__init__()
        label, self.bg, self.bar, self.kc = self.KINDS[kind]
        self.kind = kind
        self.title = title if title is not None else label
        self.content = content if isinstance(content, list) else [P(content, 'callout_dark' if kind == 'dark' else 'callout')]
        self.pad = 4.2 * mm
        self.barw = 1.1 * mm

    def wrap(self, aw, ah):
        self.aw = aw
        iw = aw - 2 * self.pad - self.barw
        self._iw = iw
        h = self.pad
        self._title_h = 0
        if self.title:
            self._title_h = 12
            h += self._title_h
        self._hs = []
        for f in self.content:
            w, fh = f.wrap(iw, 10000)
            sb = getattr(f, 'getSpaceBefore', lambda: 0)()
            sa = getattr(f, 'getSpaceAfter', lambda: 0)()
            self._hs.append((fh, sb, sa))
            h += fh + sa
        h += self.pad - 3
        self.height = h
        return aw, h

    def draw(self):
        c = self.canv
        r = 2.6 * mm
        c.saveState()
        c.setFillColor(self.bar)
        c.roundRect(0, 0, self.aw, self.height, r, stroke=0, fill=1)
        c.setFillColor(self.bg)
        c.roundRect(self.barw, 0, self.aw - self.barw, self.height, r, stroke=0, fill=1)
        c.restoreState()
        y = self.height - self.pad
        x = self.barw + self.pad
        if self.title:
            spaced(c, x, y - 6, self.title, 'BodyXB', 6.8, 1.3, self.kc)
            y -= self._title_h
        for f, (fh, sb, sa) in zip(self.content, self._hs):
            f.drawOn(c, x, y - fh)
            y -= fh + sa

    def split(self, aw, ah):
        return []


class NumberRow(Flowable):
    """Riga di numeri grandi con etichetta: [(valore, etichetta), ...]"""

    def __init__(self, items, dark=False):
        super().__init__()
        self.items, self.dark = items, dark

    def wrap(self, aw, ah):
        self.aw = aw
        self.height = 20 * mm
        return aw, self.height

    def draw(self):
        c = self.canv
        n = len(self.items)
        cw = self.aw / n
        for i, (val, lab) in enumerate(self.items):
            x = i * cw
            c.setFillColor(BLUE)
            c.setFont('SerifB', 30)
            c.drawString(x, 10.6 * mm, val)
            c.setFillColor(MUTED)
            c.setFont('Body', 7.6)
            # etichetta su max 2 righe
            words = lab.split(' ')
            lines, cur = [], ''
            for w in words:
                t = (cur + ' ' + w).strip()
                if pdfmetrics.stringWidth(t, 'Body', 7.6) > cw - 6 * mm and cur:
                    lines.append(cur)
                    cur = w
                else:
                    cur = t
            lines.append(cur)
            for j, ln in enumerate(lines[:2]):
                c.drawString(x, 5.6 * mm - j * 9, ln)
            if i:
                c.setStrokeColor(LINE)
                c.setLineWidth(0.6)
                c.line(x - 4 * mm, 1 * mm, x - 4 * mm, self.height - 1 * mm)


class CheckItem(Flowable):
    """Voce di checklist con quadratino da spuntare."""

    def __init__(self, text, style='body'):
        super().__init__()
        self.p = Paragraph(text, STYLES[style])

    def wrap(self, aw, ah):
        self.aw = aw
        _, h = self.p.wrap(aw - 8 * mm, ah)
        self.height = max(h, 11) + 3
        return aw, self.height

    def draw(self):
        c = self.canv
        c.setStrokeColor(NIGHT)
        c.setLineWidth(0.8)
        c.roundRect(0, self.height - 11.5, 8.2, 8.2, 1.6, stroke=1, fill=0)
        self.p.drawOn(c, 8 * mm, 1.5)


class FillLine(Flowable):
    """Riga da compilare: etichetta + linea."""

    def __init__(self, label, width_frac=1.0, height=9 * mm, hint=''):
        super().__init__()
        self.label, self.wf, self.h, self.hint = label, width_frac, height, hint

    def wrap(self, aw, ah):
        self.aw = aw
        return aw, self.h

    def draw(self):
        c = self.canv
        w = self.aw * self.wf
        c.setFont('BodyBold', 8)
        c.setFillColor(NIGHT)
        c.drawString(0, 3.2 * mm, self.label)
        lw = pdfmetrics.stringWidth(self.label, 'BodyBold', 8) + 3
        c.setStrokeColor(MUTED)
        c.setLineWidth(0.5)
        c.line(lw, 2 * mm, w, 2 * mm)
        if self.hint:
            c.setFont('Body', 6.8)
            c.setFillColor(MUTED)
            c.drawRightString(w, 2 * mm + 2, self.hint)


# ------------------------------------------------------------------ tabelle
def data_table(headers, rows, col_widths, num_cols=(), groups=None, zebra=True, bold_first=True,
               header_bg=NIGHT, font_scale=1.0):
    """
    headers: lista di stringhe
    rows: lista di liste di stringhe. Una riga con un solo elemento stringa e
          marcata con ('__group__', 'TITOLO') diventa intestazione di gruppo.
    num_cols: indici di colonne da allineare a destra.
    """
    data = []
    styles = []
    data.append([Paragraph(esc(h).upper(), STYLES['thr' if i in num_cols else 'th']) for i, h in enumerate(headers)])
    styles += [
        ('BACKGROUND', (0, 0), (-1, 0), header_bg),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, 0), 5), ('BOTTOMPADDING', (0, 0), (-1, 0), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5), ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]
    zi = 0
    for r in rows:
        ri = len(data)
        if isinstance(r, tuple) and r[0] == '__group__':
            data.append([Paragraph(esc(r[1]).upper(), STYLES['group'])] + [''] * (len(headers) - 1))
            styles += [('SPAN', (0, ri), (-1, ri)), ('BACKGROUND', (0, ri), (-1, ri), SAND),
                       ('TOPPADDING', (0, ri), (-1, ri), 4), ('BOTTOMPADDING', (0, ri), (-1, ri), 4)]
            zi = 0
            continue
        cells = []
        for ci, val in enumerate(r):
            if isinstance(val, Flowable) or isinstance(val, Paragraph):
                cells.append(val)
                continue
            if ci in num_cols:
                st = 'cellr'
            else:
                st = 'cellb' if (ci == 0 and bold_first) else 'cell'
            cells.append(Paragraph(str(val), STYLES[st]))
        data.append(cells)
        styles += [('TOPPADDING', (0, ri), (-1, ri), 3.6), ('BOTTOMPADDING', (0, ri), (-1, ri), 3.6),
                   ('LINEBELOW', (0, ri), (-1, ri), 0.4, LINE)]
        if zebra and zi % 2 == 1:
            styles.append(('BACKGROUND', (0, ri), (-1, ri), colors.HexColor('#FAF9F6')))
        zi += 1
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle(styles))
    return t


# ------------------------------------------------------------------ grafici
class HBar(Flowable):
    """
    Grafico a barre orizzontali.
    items: [(etichetta, valore, colore, testo_valore)]
    """

    def __init__(self, items, label_w=52 * mm, bar_h=4.4 * mm, gap=1.9 * mm, max_val=None, vfmt=None, note=None):
        super().__init__()
        self.items, self.label_w, self.bar_h, self.gap = items, label_w, bar_h, gap
        self.max_val = max_val or max(i[1] for i in items)
        self.note = note

    def wrap(self, aw, ah):
        self.aw = aw
        self.height = len(self.items) * (self.bar_h + self.gap)
        return aw, self.height

    def draw(self):
        c = self.canv
        top = self.height
        val_w = 15 * mm
        avail = self.aw - self.label_w - val_w
        for i, (lab, val, col, txt) in enumerate(self.items):
            y = top - (i + 1) * (self.bar_h + self.gap) + self.gap
            c.setFillColor(NIGHT)
            c.setFont('Body', 8)
            c.drawString(0, y + self.bar_h / 2 - 2.6, lab)
            w = max(0.8, avail * (val / self.max_val))
            c.setFillColor(LINE)
            c.roundRect(self.label_w, y, avail, self.bar_h, 1.2, stroke=0, fill=1)
            c.setFillColor(col)
            c.roundRect(self.label_w, y, w, self.bar_h, 1.2, stroke=0, fill=1)
            c.setFillColor(NIGHT)
            c.setFont('BodyBold', 8)
            c.drawString(self.label_w + avail + 2.2 * mm, y + self.bar_h / 2 - 2.6, txt)


class StackedDay(Flowable):
    """
    Barra impilata (un segmento per pasto) con, sotto, la parentesi dell'intervallo indicativo.
    segments: [(etichetta, valore, colore, testo)]
    band: (min, max) opzionale, nella stessa unità dei segmenti.
    """

    def __init__(self, segments, total_label, band=None, scale_max=None, bar_h=9 * mm, band_label=''):
        super().__init__()
        self.segments, self.total_label, self.band = segments, total_label, band
        self.bar_h, self.scale_max, self.band_label = bar_h, scale_max, band_label

    def wrap(self, aw, ah):
        self.aw = aw
        self.height = self.bar_h + 30 * mm
        return aw, self.height

    def draw(self):
        c = self.canv
        total = sum(s[1] for s in self.segments)
        smax = self.scale_max or max(total, self.band[1] if self.band else 0) * 1.06
        width = self.aw
        y = 15 * mm
        c.setFillColor(NIGHT)
        c.setFont('SerifB', 16)
        c.drawString(0, self.height - 5 * mm, self.total_label)
        x = 0
        for lab, val, col, txt in self.segments:
            w = width * val / smax
            c.setFillColor(col)
            c.rect(x, y, w, self.bar_h, stroke=0, fill=1)
            c.setStrokeColor(WHITE)
            c.setLineWidth(1.2)
            c.line(x + w, y, x + w, y + self.bar_h)
            c.setFont('BodyBold', 7.6)
            if w >= 13 * mm:
                c.setFillColor(WHITE if col in (BLUE, NIGHT) else NIGHT)
                c.drawCentredString(x + w / 2, y + self.bar_h / 2 - 2.6, txt)
            else:  # segmento stretto: il valore va sopra la barra
                c.setFillColor(NIGHT)
                c.drawCentredString(x + w / 2, y + self.bar_h + 1.6 * mm, txt)
            c.setFillColor(MUTED)
            c.setFont('Body', 7)
            c.drawCentredString(x + w / 2, y - 4.2 * mm, lab)
            x += w
        if self.band:
            lo, hi = self.band
            x0, x1 = width * lo / smax, width * hi / smax
            yb = 6.2 * mm
            c.setStrokeColor(BLUE)
            c.setLineWidth(1.1)
            c.line(x0, yb, x1, yb)
            c.line(x0, yb - 1.4 * mm, x0, yb + 1.4 * mm)
            c.line(x1, yb - 1.4 * mm, x1, yb + 1.4 * mm)
            c.setFillColor(BLUE)
            c.setFont('BodyBold', 7.4)
            c.drawCentredString((x0 + x1) / 2, yb - 4 * mm, self.band_label)


class Plate(Flowable):
    """Piatto diviso: 1/2 verdura, 1/4 carboidrati, 1/4 proteine (+ filo d'olio)."""

    def __init__(self, size=62 * mm, labels=True):
        super().__init__()
        self.size, self.labels = size, labels

    def wrap(self, aw, ah):
        self.aw = aw
        self.height = self.size + 6 * mm
        return aw, self.height

    def draw(self):
        c = self.canv
        s = self.size
        cx, cy = self.aw / 2 - 30 * mm, self.height / 2
        R = s / 2
        # bordo del piatto
        c.setFillColor(WHITE)
        c.setStrokeColor(NIGHT)
        c.setLineWidth(1.1)
        c.circle(cx, cy, R + 2.5 * mm, stroke=1, fill=1)
        inner = R - 2.2 * mm

        def wedge(a0, a1, col):
            c.setFillColor(col)
            c.setStrokeColor(WHITE)
            c.setLineWidth(2.2)
            p = c.beginPath()
            p.moveTo(cx, cy)
            steps = 60
            for i in range(steps + 1):
                a = math.radians(a0 + (a1 - a0) * i / steps)
                p.lineTo(cx + inner * math.cos(a), cy + inner * math.sin(a))
            p.close()
            c.drawPath(p, stroke=1, fill=1)

        wedge(90, 270, BLUE)          # metà sinistra: verdura
        wedge(-90, 0, BLUE_SOFT)      # quarto in basso a destra: carboidrati
        wedge(0, 90, NIGHT)           # quarto in alto a destra: proteine
        # filo d'olio (accento rosso raro)
        c.setFillColor(RED)
        c.setStrokeColor(WHITE)
        c.setLineWidth(1.4)
        c.circle(cx, cy, 2.3 * mm, stroke=1, fill=1)
        c.setFont('SerifB', 26)
        c.setFillColor(WHITE)
        c.drawCentredString(cx - inner * 0.5, cy - 3 * mm, '½')
        c.drawCentredString(cx + inner * 0.5, cy + inner * 0.5 - 3 * mm, '¼')
        c.setFillColor(NIGHT)
        c.drawCentredString(cx + inner * 0.5, cy - inner * 0.5 - 1 * mm, '¼')
        # legenda a destra
        lx = cx + R + 14 * mm
        rows = [
            (BLUE, 'Verdura e ortaggi', 'La metà del piatto: volume, fibre, varietà.'),
            (BLUE_SOFT, 'Cereali e derivati', 'Un quarto: pasta, riso, pane, patate.'),
            (NIGHT, 'Proteine', 'Un quarto: carne, pesce, uova, legumi, latticini.'),
            (RED, 'Condimento', 'Un filo, misurato: circa un cucchiaio di olio.'),
        ]
        y = cy + 24 * mm
        for col, t, d in rows:
            c.setFillColor(col)
            c.circle(lx, y + 1.4 * mm, 1.7 * mm, stroke=0, fill=1)
            c.setFillColor(NIGHT)
            c.setFont('BodyBold', 8.6)
            c.drawString(lx + 5 * mm, y, t)
            c.setFillColor(MUTED)
            c.setFont('Body', 7.6)
            c.drawString(lx + 5 * mm, y - 9.5, d)
            y -= 16 * mm


class BarMacro(Flowable):
    """Barra sottile con il rapporto proteine/carboidrati/grassi (in % delle kcal dai macro)."""

    def __init__(self, p, c, f, width=40 * mm, h=2.2 * mm):
        super().__init__()
        self.p, self.c, self.f, self.w, self.h = p, c, f, width, h

    def wrap(self, aw, ah):
        return self.w, self.h + 1

    def draw(self):
        kp, kc, kf = self.p * 4, self.c * 4, self.f * 9
        tot = (kp + kc + kf) or 1
        x = 0
        for k, col in ((kp, BLUE), (kc, BLUE_SOFT), (kf, NIGHT)):
            w = self.w * k / tot
            self.canv.setFillColor(col)
            self.canv.rect(x, 0, w, self.h, stroke=0, fill=1)
            x += w


def macro_pct(m):
    kp, kc, kf = m['protein'] * 4, m['carbs'] * 4, m['fat'] * 9
    tot = (kp + kc + kf) or 1
    return round(kp / tot * 100), round(kc / tot * 100), round(kf / tot * 100)


def recipe_card(rec, data, width, extra_note=None):
    """Scheda ricetta compatta: nome, tempo, ingredienti (g), macro. Valori calcolati dal DB."""
    t = data.recipe(rec) if isinstance(rec, str) else rec
    tot = t['totals']
    ing = ', '.join(f"{esc(data.food(i['foodId'])['name'])} {i['grams']} g" for i in t['ingredients'])
    pp, pc, pf = macro_pct(tot)
    name = Paragraph(f"<font name='SerifSB' size='13.5'>{esc(t['name'])}</font>", ParagraphStyle('rn', leading=17))
    meta = Paragraph(f"{esc(t['category'])} · {t['time']} min · 1 porzione", STYLES['tiny'])
    ingp = Paragraph(ing, STYLES['small'])
    macro = Paragraph(
        f"<font name='BodyBold' color='#3155FF'>{tot['kcal']} kcal</font> &nbsp;·&nbsp; "
        f"proteine {fmt(tot['protein'])} g &nbsp;·&nbsp; carboidrati {fmt(tot['carbs'])} g &nbsp;·&nbsp; "
        f"grassi {fmt(tot['fat'])} g &nbsp;·&nbsp; fibre {fmt(tot['fiber'])} g",
        ParagraphStyle('m', parent=STYLES['cell'], fontSize=8.2, leading=11))
    bar = BarMacro(tot['protein'], tot['carbs'], tot['fat'], width=width - 8 * mm)
    inner = [name, Spacer(1, 1.5), meta, Spacer(1, 3), ingp, Spacer(1, 1), macro, Spacer(1, 3), bar]
    tb = Table([[inner]], colWidths=[width])
    tb.setStyle(TableStyle([
        ('BOX', (0, 0), (-1, -1), 0.6, LINE), ('BACKGROUND', (0, 0), (-1, -1), WHITE),
        ('LEFTPADDING', (0, 0), (-1, -1), 4 * mm), ('RIGHTPADDING', (0, 0), (-1, -1), 4 * mm),
        ('TOPPADDING', (0, 0), (-1, -1), 3.2 * mm), ('BOTTOMPADDING', (0, 0), (-1, -1), 3.2 * mm),
        ('ROUNDEDCORNERS', [6, 6, 6, 6]),
    ]))
    return KeepTogether([tb, Spacer(1, 3.2 * mm)])


# ------------------------------------------------------------------ copertina
class Cover(Flowable):
    def __init__(self, number, kicker, title_lines, subtitle, edition, tagline):
        super().__init__()
        self.number, self.kicker, self.title_lines = number, kicker, title_lines
        self.subtitle, self.edition, self.tagline = subtitle, edition, tagline

    def wrap(self, aw, ah):
        self.aw, self.ah = aw, ah
        return aw, ah - 1

    def draw(self):
        c = self.canv
        # il flowable è disegnato nel frame che occupa tutta la pagina: origine = angolo basso-sinistro pagina
        c.saveState()
        c.setFillColor(NIGHT)
        c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
        # cerchi concentrici (il "gusto-scopio")
        cx, cy = PAGE_W * 0.80, PAGE_H * 0.24
        c.setStrokeColor(BLUE)
        for i, r in enumerate(range(20, 190, 22)):
            c.setLineWidth(0.8)
            c.setStrokeAlpha(max(0.05, 0.62 - i * 0.075))
            c.circle(cx, cy, r * mm * 0.9, stroke=1, fill=0)
        c.setFillAlpha(0.95)
        c.setFillColor(BLUE)
        c.circle(cx, cy, 7 * mm, stroke=0, fill=1)
        c.setFillAlpha(1)
        c.setStrokeAlpha(1)
        # accento rosso (raro): un puntino
        c.setFillColor(RED)
        c.circle(cx + 30 * mm, cy + 24 * mm, 1.7 * mm, stroke=0, fill=1)
        # marchio
        left = MARGIN_X + 4 * mm
        c.setFillColor(WHITE)
        c.setFont('SerifB', 19)
        c.drawString(left, PAGE_H - 26 * mm, 'GUSTOSCOPIO')
        spaced(c, left, PAGE_H - 62 * mm, f'{self.kicker}  ·  N° {self.number}', 'BodyXB', 7.4, 1.7, BLUE)
        # titolo
        y = PAGE_H - 84 * mm
        c.setFillColor(WHITE)
        c.setFont('SerifB', 58)
        for ln in self.title_lines:
            c.drawString(left, y, ln)
            y -= 55
        # sottotitolo
        y -= 6
        sub = Paragraph(esc(self.subtitle), ParagraphStyle(
            'cs', fontName='Serif', fontSize=16, leading=22, textColor=colors.HexColor('#D5D8E3')))
        w, h = sub.wrap(PAGE_W - 2 * MARGIN_X - 40 * mm, 200)
        sub.drawOn(c, left, y - h)
        # piè copertina
        c.setStrokeColor(WHITE)
        c.setStrokeAlpha(0.25)
        c.setLineWidth(0.6)
        c.line(left, 30 * mm, PAGE_W - MARGIN_X - 4 * mm, 30 * mm)
        c.setStrokeAlpha(1)
        c.setFillColor(colors.HexColor('#AEB2C2'))
        c.setFont('Body', 8)
        c.drawString(left, 22 * mm, self.edition)
        c.drawRightString(PAGE_W - MARGIN_X - 4 * mm, 22 * mm, self.tagline)
        c.restoreState()


# ------------------------------------------------------------------ documento
class GuideDoc(BaseDocTemplate):
    def __init__(self, filename, title, short_title, subject, **kw):
        super().__init__(
            filename, pagesize=A4, title=title, author='Gustoscopio', subject=subject,
            creator='Gustoscopio', keywords='Gustoscopio, nutrizione, guida', pageCompression=1, **kw)
        self.short_title = short_title
        full = Frame(0, 0, PAGE_W, PAGE_H, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id='full')
        body = Frame(MARGIN_X, MARGIN_BOTTOM, CONTENT_W, PAGE_H - MARGIN_TOP - MARGIN_BOTTOM,
                     leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id='body')
        self.addPageTemplates([
            PageTemplate(id='cover', frames=[full]),
            PageTemplate(id='body', frames=[body], onPage=self._footer),
        ])
        self._bm = 0

    def _footer(self, canv, doc):
        canv.saveState()
        canv.setStrokeColor(LINE)
        canv.setLineWidth(0.5)
        canv.line(MARGIN_X, 15 * mm, PAGE_W - MARGIN_X, 15 * mm)
        canv.setFillColor(NIGHT)
        canv.setFont('SerifB', 9.5)
        canv.drawString(MARGIN_X, 10.2 * mm, 'GUSTOSCOPIO')
        canv.setFillColor(MUTED)
        canv.setFont('Body', 7.4)
        canv.drawString(MARGIN_X + 27 * mm, 10.4 * mm, self.short_title)
        canv.setFillColor(NIGHT)
        canv.setFont('BodyBold', 8)
        canv.drawRightString(PAGE_W - MARGIN_X, 10.2 * mm, str(doc.page))
        canv.restoreState()

    def afterFlowable(self, flowable):
        toc = getattr(flowable, '_toc', None)
        if toc:
            level, text = toc
            key = f'ch{self._bm}'
            self._bm += 1
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(text, key, level, 0)
            self.notify('TOCEntry', (level, text, self.page))


def make_toc():
    toc = TableOfContents()
    toc.dotsMinLevel = 0
    toc.levelStyles = [ParagraphStyle(
        'toc0', fontName='SerifSB', fontSize=16, leading=27, textColor=NIGHT, leftIndent=0, firstLineIndent=0)]
    return toc


def build(story, path, title, short_title, subject):
    doc = GuideDoc(path, title, short_title, subject)
    doc.multiBuild(story)
    return doc
