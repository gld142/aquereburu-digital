"""Demande des planches de petites scènes au générateur gratuit. usage : python generer.py <dossier de sortie>"""
import shutil, sys, time
from gradio_client import Client

sortie = sys.argv[1]
STYLE = ("Hand-drawn pen and ink illustration, dark navy blue ink on pure white paper, in the tradition of French press "
         "illustration and travel sketchbooks: confident contour lines, fine cross-hatching for shadows and cloth. No colour, "
         "no grey wash. Three separate small isolated vignettes side by side on the same white sheet, clearly apart from each "
         "other with wide empty white space between them and around them, no background scenery beyond a few light strokes. "
         "No frame, no border, no text, no letters, no caption, no signature, no watermark. Figures shown in full, head to toe, "
         "with clear readable silhouettes. Setting: Lome, Togo, West Africa; dignified, warm, everyday life. ")
PLANCHES = {
    'planche-a': "Left vignette: a motorcycle taxi seen from the side, the driver in a helmet and short-sleeved shirt, and behind him a lawyer in a suit riding pillion, holding a leather briefcase. Centre vignette: a market woman in a wax-print wrapper and headscarf walking with a wide basin of fruit balanced on her head and a baby tied on her back. Right vignette: a young law clerk in shirt and tie walking briskly, carrying a very tall leaning stack of case files in both arms.",
    'planche-b': "Left vignette: three children playing barefoot football on the sand, one kicking the ball. Centre vignette: a young woman law student sitting on a bench under a coconut palm, reading a thick book open on her knees, her bicycle leaning against the bench. Right vignette: seen from behind, a lawyer in a black court robe climbing the steps of a courthouse between two columns, a file under the arm.",
    'planche-c': "Left vignette: a lawyer in a suit and a market trader woman in a wrapper shaking hands in front of a small stall. Centre vignette: an old man in a traditional boubou sitting on a wooden stool mending a fishing net, a pirogue behind him. Right vignette: a colonial-era palace with a central tower, arcades and palm trees in front, a small passer-by with an umbrella giving the scale.",
}
c = Client("Tongyi-MAI/Z-Image-Turbo", verbose=False)
for nom, scenes in PLANCHES.items():
    try:
        t = time.time()
        r = c.predict(prompt=STYLE + scenes, resolution="2048x1152 ( 16:9 )", seed=42, steps=8, shift=3.0, random_seed=True, gallery_images=[], api_name="/generate")
        img = r[0][-1]['image']
        chemin = img.get('path') or img.get('url')
        shutil.copy(chemin, f"{sortie}/{nom}.png")
        print(nom, 'ok', round(time.time() - t), 's', flush=True)
    except Exception as e:
        print(nom, 'ECHEC', type(e).__name__, str(e)[:300], flush=True)
