import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    const { data, error } = await supabase.from('votes').select('*');
    if (error) throw error;
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error('Erreur lors de la récupération des votes :', err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const { index, type } = await req.json();

    // Validation des données
    if (index === undefined || (type !== 'up' && type !== 'down')) {
      return new Response(JSON.stringify({ error: 'Invalid data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Vérifie si une ligne existe pour le `movie_id`
    const { data: existingVote, error: selectError } = await supabase
      .from('votes')
      .select('*')
      .eq('movie_id', index)
      .single();

    if (selectError && selectError.code === 'PGRST116') {
      // Si aucune ligne n'existe, crée une nouvelle ligne
      const { error: insertError } = await supabase.from('votes').insert({
        movie_id: index,
        upvotes: type === 'up' ? 1 : 0,
        downvotes: type === 'down' ? 1 : 0,
      });

      if (insertError) {
        console.error('Erreur lors de la création du vote:', insertError);
        return new Response(
          JSON.stringify({ error: 'Failed to create vote' }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (selectError) {
      // Autres erreurs de récupération
      console.error('Erreur lors de la récupération du vote:', selectError);
      return new Response(JSON.stringify({ error: selectError.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Si une ligne existe, met à jour les votes
    const updatedVote =
      type === 'up'
        ? { upvotes: existingVote.upvotes + 1 }
        : { downvotes: existingVote.downvotes + 1 };

    const { error: updateError } = await supabase
      .from('votes')
      .update(updatedVote)
      .eq('movie_id', index);

    if (updateError) {
      console.error('Erreur lors de la mise à jour des votes:', updateError);
      return new Response(JSON.stringify({ error: 'Failed to update vote' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Erreur lors de la mise à jour des votes:', err.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
